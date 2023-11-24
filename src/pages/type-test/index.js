import React from 'react';

import './style.css';


const TypeTest = () => {

  React.useEffect(() => {
    import('./handle')
  }, []);


  return (
    <>
      <div id='result' style={{ overflow: 'auto', height: 'calc(100vh - 300px)' }} />
      <div>
        <p id="offscreen-text" className="offscreen-text"></p>
        <p id="text" className="text"></p>
        <svg id="svg"></svg>
        <input type="text" className="input" id="input" style={{
          height: '50px',
          width: '500px',
        }} onKeyUp={(event) => {
          if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.target.value = '';
            event.preventDefault();
            const txtEle = document.getElementById('text');
            const aaaa = txtEle.cloneNode(true);
            aaaa.id = 'result-item';
            aaaa.style.top = 0;
            aaaa.style.position = 'relative';
            aaaa.style.transform = 'translateX(-50%)';
            document.getElementById('result').appendChild(aaaa);
            txtEle.innerHTML = '';
            setTimeout(() => {
              document.getElementById('result').scrollTo({ top: document.getElementById('result').scrollHeight + 100 });
            }, 300);
          }
        }} />
      </div>
    </>
  )
}

export default TypeTest;
