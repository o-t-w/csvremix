import { useState } from 'react';

export default function Index() {

  const [showResult, setShowResult] = useState(false);
  const [filename, setFileName] = useState(false);

  function handleFileUpload(event) {
    setFileName(event.target.files[0].name);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setShowResult(true);
  }

  function handleShare() {
    fetch('output.csv')
    .then(response => response.blob)
    .then(blob => {
      const file = new File([blob], 'salesdata.csv', { type: 'text/csv' });
      navigator.share({files: [file]});
    })
  }

  return (
    <main>   
            <div className="glass-effect">
                <form className="form" action="">
                    <h1 style={{borderBottom: "solid 1px rgba(0,0,0,.08)"}} className="mb-6 pb-2">Upload CSV</h1>
                   <div className="file-selector">
                    
                        <label className="relative button" htmlFor="csv-picker">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <span>Choose CSV file</span>
                     <input onChange={handleFileUpload} required className="opacity-0 absolute w-0 h-0" id="csv-picker" accept=".csv" type="file" />
                    </label>
                    <span>{filename ? filename : "No file selected"}</span>
                   </div>
                 
                     <fieldset className="radio-group mt-6">
                         <legend className="mb-3">Select a Method:</legend>   
                          
                           <label className="radio" htmlFor="one"> <input type="radio" id="one" name="method" value="1"
                             /><span>Method 1</span></label>
                         
                           <label className="radio" htmlFor="two"> <input type="radio" id="two" name="method" value="2"/><span>Method 2</span></label> 
                          
                           <label className="radio" htmlFor="three"><input type="radio" id="three" name="method" value="3"/><span>Method 3</span></label>
                       
                     </fieldset>
                     
                 
                     <label className="mt-6" htmlFor="column">Column</label>
                     <input id="column" className="mt-1 width-4-char" pattern="[a-zA-Z]" maxLength="1" type="text" />
                 
                     <fieldset className="mt-6">
                        <legend>Select rows:</legend>
                    <div className="flex gap-6 mt-1">
                    <div>
                    <label className="font-small" htmlFor="start">Start</label>
                     <input id="start" className="width-4-char mt-1" type="number" />
                    </div>
                 
                     <div>             
                         <label className="font-small" htmlFor="end">End</label>
                         <input id="end" className="width-4-char mt-1" type="number" />
                     </div>
                    </div>
                </fieldset>
                 
                    <button onClick={handleSubmit} className="mt-6 button cta" type="submit">Submit</button>
                 </form>
            </div>
            
            
            <div style={{opacity: showResult ? '100%' : '0%'}}  className="glass-effect">
               <div className="results-container">
                <h1 style={{borderBottom: "solid 1px rgba(0,0,0,.08)"}} className="mb-6 pb-2">Result</h1>
                <output className="text-4xl" name="result" htmlFor="a b">1060</output>
               <div className="flex gap-3 mt-5">
                <a className="button cta" download href="output.csv">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>Download CSV
                </a>
                <button onClick={handleShare} className="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-share-2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>Share</button>
               </div>
            </div>
               </div>


</main>
  );
}
