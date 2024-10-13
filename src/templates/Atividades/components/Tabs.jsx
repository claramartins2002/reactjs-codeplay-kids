import React from 'react';
import './Tabs.css';

const Tabs = ({ selectedTab, setSelectedTab, tabs }) => {
  return (
    <div className="tabs-container">
      {tabs.map((tab, index) => (
        <React.Fragment key={tab}>
          <input
            type="radio"
            id={`tab-${tab.toLowerCase()}`}
            name="tab"
            checked={selectedTab === tab}
            onChange={() => setSelectedTab(tab)}
          />
          <label htmlFor={`tab-${tab.toLowerCase()}`} className="tab">
            {tab}
          </label>
        </React.Fragment>
      ))}

      <div className={`glider ${selectedTab === tabs[1] ? 'glide-finalizadas' : 'glide-criadas'}`}></div>
    </div>
  );
};

export default Tabs;
