import { useState } from 'react';
import { useHydrated } from "remix-utils";
import * as Papa from 'papaparse';

export default function Index() {
  const hydrated = useHydrated() 

  const [filename, setFileName] = useState(false);
  const [result, setResult] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);

  function handleFileUpload(event) {
    const file = event.target.files[0];
    setFileName(file.name);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    const file = event.target.querySelector('input[type="file"]').files[0];
    const firstRow = formData.get('start');
    const lastRow = parseFloat(formData.get('end')) + 1;
    const column = formData.get('column').toUpperCase();
    const method = formData.get('method');
    Papa.parse(file, {complete: function(results) {
      console.log(results.data);
     const releventColumnIndex = results.data[0].indexOf(column);
     const releventColumn = results.data.map(row => row[releventColumnIndex]);
     const releventRows = releventColumn.slice(firstRow, lastRow);
     console.log(releventRows);
     if (method == 1) {
      setResult(releventRows.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0));
      } 
      else if (method == 2) {
       const total = releventRows.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0);
       setResult(total / releventRows.length);
      } 
      else if (method == 3) {
        setResult(releventRows.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0))
      }

      const releventRowsEachInArray = releventRows.map(row => [row]);
  
      const dataAsCSV = Papa.unparse({
        "fields": [column],
        "data": releventRowsEachInArray
      });
      const csvBlob = new Blob([dataAsCSV], {type: 'text/csv;charset=utf-8;'});
      setDownloadLink(URL.createObjectURL(csvBlob));
    }})
  }  
  
  function handleShare() {
    fetch('output.csv')
    .then(response => response.blob)
    .then(blob => {
      const file = new File([blob], 'salesdata.csv', { type: 'text/csv' });
      navigator.share({files: [file]});
    })
  }

  function ShareButton() {
    return (
      <button onClick={handleShare} className="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-share-2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>Share</button>
    )
  }

  return (
    <main>   
            <div className="glass-effect">
                <form onSubmit={handleSubmit} className="form" action="">
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
                     <input required name="column" id="column" className="mt-1 width-4-char" pattern="[a-zA-Z]" maxLength="1" type="text" />
                 
                     <fieldset className="mt-6">
                        <legend>Select rows:</legend>
                    <div className="flex gap-6 mt-1">
                    <div>
                    <label className="font-small" htmlFor="start">Start</label>
                     <input required name="start" id="start" className="width-4-char mt-1" type="number" />
                    </div>
                 
                     <div>             
                         <label className="font-small" htmlFor="end">End</label>
                         <input required name="end" id="end" className="width-4-char mt-1" type="number" />
                     </div>
                    </div> 
                </fieldset>
                 
                    <button className="mt-6 button cta px-5" type="submit">Submit</button>
                 </form>
            </div>
            
            
            <div style={{opacity: result !== null ? '100%' : '0%'}}  className="glass-effect">
               <div className="results-container">
                <h1 style={{borderBottom: "solid 1px rgba(0,0,0,.08)"}} className="mb-6 pb-2">Result</h1>
                <output className="text-4xl" htmlFor="start end column">{result}</output>
               <div className="flex gap-3 mt-5">
                <a className="button cta" download href={downloadLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>Download CSV
                </a>
              
               { hydrated && navigator.canShare && <ShareButton />}
            
               </div>
            </div>
               </div>


</main>
  );
}
