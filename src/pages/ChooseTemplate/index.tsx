import { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'

import useAuth from '@hooks/useAuth';

import { AppContext } from '@context/ProviderContext';

import { clearLocalStorage, getResumeFromLocalStorage, saveResumeToLocalStorage } from '@services/localstorage';
import { getTimestamp } from '@services/time';

import emptyResume from '@data/emptyResume';

import templatesImg from '@assets/templates';

import logod from '@assets/logo.png';
import logol from '@assets/logolight.png';

import './choosetemplate.scss';

function Template({ src, onClick, ...props }: any) {
  return (
    <>
      <div className="template-card" {...props}>
        <div className='overlay'></div>
        <img src={src} />
        <button className='primary' style={{zIndex: '1001'}} onClick={onClick}>Use this template</button>
      </div>
    </>
  )
}

export default function ChooseTemplate({darkmode}: any) {

  const [params] = useSearchParams();

  const navigate = useNavigate();
  const services = useContext(AppContext);

  const auth = useAuth(services.auth);

  async function prepareForNewBuild(templateID: number) {
    clearLocalStorage();
    
    const resume = {...emptyResume};

    if(auth) {
      const id = await services.db.getMetadata(services.auth.getUserId(), 'increment');
      services.db.setMetadata(services.auth.getUserId(), 'increment', parseInt(id) + 1);
  
      resume.id = id;
      resume.name = `Resume #${id}`;
    } else {
      resume.id = 0;
      resume.name = 'Resume #Local';
    }

    resume.template = templateID;
    resume.created = getTimestamp();

    saveResumeToLocalStorage(resume);
  }

  async function onTemplateClick(templateID: number) {
    if(params.get('change') != null) {
      // If the change search param is not null edit the template used by the current 
      // resume in local storage
      const resume = getResumeFromLocalStorage();
      resume.template = templateID;
      
      console.log(resume);
      // Save the edit resume back to local storage and in firestore
      saveResumeToLocalStorage(resume);
      await services.db.uploadResume(services.auth.getUserId(), resume);

      navigate(-1);
    } else {      
      // Else, create a new resume
      await prepareForNewBuild(templateID);
    }

    const link = `/build?template=${templateID}&step=basics`

    navigate(link);
  }

  return (
    <>
      <div id='logo' onClick={() => navigate('/')}>
        <img src={darkmode ? logol : logod}/>
      </div>
      <div className='templates'>
        <h1>Choose a template</h1>
        <div className='container'>
          <Template src={templatesImg[0]} onClick={() => onTemplateClick(1)}></Template>
          <Template src={templatesImg[1]} onClick={() => onTemplateClick(2)}></Template>
          <Template src={templatesImg[2]} onClick={() => onTemplateClick(3)}></Template>
          <Template src={templatesImg[3]} onClick={() => onTemplateClick(4)}></Template>
          {/* <Template src={temp5} onClick={() => onTemplateClick(5)}></Template> */}
        </div>
      </div>
    </>
  )
}