import { useState, useEffect } from 'react';
import './App.css';
import Editor from './components/Editor';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
    const [html, setHtml] = useLocalStorage('html', '');
    const [css, setCss] = useLocalStorage('css', '');
    const [javascript, setJavascript] = useLocalStorage('javascript', '');

    const[srcDoc, setsrcDoc] = useState('')
   
    useEffect(()=>{
      const timeout = setTimeout(() => {
        setsrcDoc(`
          <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${javascript}</script>
          </html>
        `)
      }, 250)

      return () => clearTimeout(timeout)
    }, [html, css, javascript])

    

    return (
        <>
            <div className='h-1/2 flex'>
                <Editor 
                    language='xml'
                    displayName='HTML'
                    value={html}
                    onChange={setHtml}
                />
                <Editor 
                    language='css'
                    displayName='CSS'
                    value={css}
                    onChange={setCss}
                />
                <Editor 
                    language='javascript'
                    displayName='JavaScript'
                    value={javascript}
                    onChange={setJavascript}
                />
            </div>
            <div className='flex h-[50vh]'>
                <iframe
                    srcDoc={srcDoc}
                    title='output'
                    sandbox='allow-scripts'
                    frameBorder='0'
                    width='100%'
                    height='100%'
                />
            </div>
        </>
    );
}

export default App;
