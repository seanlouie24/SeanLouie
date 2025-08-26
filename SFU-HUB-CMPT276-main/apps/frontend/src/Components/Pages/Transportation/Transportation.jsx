import React, { useState, useEffect } from 'react';
import './Transportation.css';
import { Link } from 'react-router-dom';
import parkingImage from './trans-pics/parking.jpg';
import campusImage from './trans-pics/campus.jpg';

const Transportation = () => {
  const [selectedCampus, setSelectedCampus] = useState('');
  const [selectedStop, setSelectedStop] = useState([]);
  const [busData, setBusData] = useState({});

  const stops = {
    Burnaby: [
        { value: ['51863', '52806'], label: 'SFU Transportation Centre' },
        { value: ['51861', '53096', '52807', '60662'], label: 'SFU Transit Exchange' },
    ],
    Surrey: [
        { value: ['55210', '55836', '55612', '55713', '55714', '55738', '55070', '55070', '55441', '56406', '61035', '61036', '61787'], label: 'Surrey Central Station' },
        { value: ['55210'], label: 'Surrey Central Station @ Bay 2' },
        { value: ['55836'], label: 'Surrey Central Station @ Bay 3' },
        { value: ['55612'], label: 'Surrey Central Station @ Bay 4' },
        { value: ['55713'], label: 'Surrey Central Station @ Bay 5' },
        { value: ['55714'], label: 'Surrey Central Station @ Bay 6' },
        { value: ['55738'], label: 'Surrey Central Station @ Bay 7' },
        { value: ['54993'], label: 'Surrey Central Station @ Bay 8' },
        { value: ['55070'], label: 'Surrey Central Station @ Bay 9' },
        { value: ['55441'], label: 'Surrey Central Station @ Bay 10' },
        { value: ['56406'], label: 'Surrey Central Station @ Bay 11' },
        { value: ['61035'], label: 'Surrey Central Station @ Bay 12' },
        { value: ['61036'], label: 'Surrey Central Station @ Bay 13' },
        { value: ['61787'], label: 'Surrey Central Station @ Bay 14' },
    ],
    Vancouver: [
        { value: ['50035'], label: 'Waterfront Station @ Bay 3' },
        { value: ['50852'], label: 'WB W Hastings St @ Richards St' },
        { value: ['50189'], label: 'Southbound Richards St @ W Hastings St' },
        { value: ['50034'], label: 'NB Granville St @ W Hastings St' },
    ],
  };

  const handleCampusChange = (event) => {
    setSelectedCampus(event.target.value);
    setSelectedStop([]);
  };

  const handleStopChange = async (event) => {
    if (event.target.value === '') {
        setSelectedStop([]);
        return
    }

    const chosenStops = event.target.value.split(',');
    const newStops = chosenStops.filter((stop) => !busData[stop]);
    if (newStops.length !== 0) {
      const response = await fetch(`https://api.sfuhub.ca/transit?stopNumbers=${newStops.join('%2C')}`);
      const data = await response.json();
      const newData = busData;

      data.forEach(stop => {
        stop.stops.length = Math.min(stop.stops.length, 5); 
        newData[stop.stopNumber] = stop;
      });

      setBusData(newData);
    }

    setSelectedStop(chosenStops);

  };

  return (
    <div className='transportation'>
      <h1 className='trans_header'>Transportation</h1>
      <section className="image-gridT">
        <div className="grid-itemT">
          <Link to={'/parking'}>
            <div className="image1" style={{ backgroundImage: `url(${parkingImage})` }}></div>
            <div className="image-textT">Parking</div>
          </Link>
        </div>
        <div className="grid-itemT">
          <Link to={'/route'}>
            <div className="image2" style={{ backgroundImage: `url(${campusImage})` }}></div>
            <div className="image-textT">Campus to Campus</div>
          </Link>
        </div>
      </section>

      <div className='trans_content'>
        <h2>Select SFU Campus</h2>
        <div className='campus_dropdown'>
          <select className="campus_selector" onChange={handleCampusChange}>
            <option value="">Select Campus</option>
            <option value="Burnaby">Burnaby</option>
            <option value="Surrey">Surrey</option>
            <option value="Vancouver">Vancouver</option>
          </select>
        </div>
      </div>
      <div className='select_stop'>
        <h2>Bus Stop</h2>
        <div className='stop_dropdown'>
          <select
            className="stop_selector"
            onChange={handleStopChange}
            disabled={!selectedCampus}
          >
            <option value="">Select Stop</option>
            {selectedCampus && stops[selectedCampus].map((stop) => (
              <option key={stop.value} value={stop.value}>{stop.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='bus_info'>
        <h2>Bus Information</h2>
        {
            selectedStop.reduce((acc, stop) => busData[stop] != undefined && acc, true) && selectedStop.map((stop) => {
                if (busData[stop] !== undefined) {
                    if (busData[stop].stops.length === 0) {
                        return <>
                            <h3 className='stop_detail'>{busData[stop].stopName}</h3>
                            <p>No buses available</p>
                        </>;
                    }
                    
                    return <>
                        <h3 className='stop_detail'>{busData[stop].stopName}</h3>
                        <ul>
                            {busData[stop].stops.map((bus, index) => (
                                <li key={index} className='bus_item'>
                                    <div className='bus_code'>{bus.routeCode}</div>
                                    <div className='bus_details'>
                                        <div className='bus_route'>{`to ${bus.destination}`}</div>
                                        <div className='bus_time'>{new Date(bus.time * 1000).toLocaleTimeString()}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>;
                }
            })
        //     <ul>
        //     {busData[selectedStop] && busData[selectedStop].map((bus, index) => (
        //       <li key={index} className='bus_item'>
        //         <div className='bus_code'>{bus.routeCode}</div>
        //         <div className='bus_details'>
        //           <div className='bus_route'>{bus.routeName}</div>
        //           <div className='bus_time'>{bus.time}</div>
        //         </div>
        //       </li>
        //     ))}
        //   </ul>
        }
      </div>
    </div>
  );
};

export default Transportation;
