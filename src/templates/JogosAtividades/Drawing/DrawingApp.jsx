import React from 'react';
import ReactPainter from 'react-painter';
import './DrawingApp.css'

function DrawingApp() {
  return (
    <>
      <ReactPainter
        width={1000}
        height={600}
        render={({ canvas, triggerSave, setColor, setLineWidth, setLineJoin, setLineCap, imageDownloadUrl }) => (
          <div className='drawing-container'>
            <h1 className='drawing-title'>Sketch Book</h1>
            <div className="toolbox">
              <div className="flex">
                <label htmlFor="">Cores</label>
                <input type="color" onChange={(e) => setColor(e.target.value)} />
              </div>
              <div className="flex">
                <label htmlFor="">Tamanho pincel</label>
                <input type="range" defaultValue={"1"} min="1" max="50" onChange={(e) => setLineWidth(e.target.value)} />
              </div>
              {
                imageDownloadUrl ? <a href={imageDownloadUrl}>Download</a> : <button onClick={triggerSave}>Save</button>
              } 
            </div>
            <div className="awesomeContainer">{canvas}</div>
          </div>
        )}
      />
    </>
  );
}

export default DrawingApp;
