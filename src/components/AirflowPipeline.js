import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/AirflowView.css'; 

function AirflowView() {
  const [content] = useState('Airflow ML pipelines are awesome!');
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [vessels, setVessels] = useState([]);
  const [selectedVesselId, setSelectedVesselId] = useState(null); 
  const [selectedParameters, setSelectedParameters] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/get_client_data');
        if (!response.ok) {
          throw new Error('Failed to fetch client data');
        }
        const clientData = await response.json();
        setClients(clientData);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleClientChange = async (event) => {
    const selectedClient = event.target.value;
    setSelectedClientId(selectedClient);
    setVessels([]);
    setSelectedParameters([]);
    try {
      const response = await fetch(`/get_vessel_data?client=${selectedClient}`);
      if (!response.ok) {
        throw new Error('Failed to fetch vessel data');
      }
      const vesselData = await response.json();
      setVessels(vesselData);
    } catch (error) {
      console.error('Error fetching vessels:', error);
    }
  };

  const handleVesselChange = async (event) => {
    const selectedVesselId = event.target.value;
    setSelectedVesselId(selectedVesselId); 
    try {
      const response = await fetch(`/get_parameters?client=${selectedClientId}&vessel=${selectedVesselId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch parameters data');
      }
      const parametersData = await response.json();
      setSelectedParameters(parametersData);
    } catch (error) {
      console.error('Error fetching parameters:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', {
      selectedClientId,
      selectedVesselId: vessels.find(vessel => vessel.id === selectedVesselId)?.name,
      selectedParameters,
      startDate,
      endDate
    });
  };

  return (
    <div className="container">
      <p className="text-center">{content}</p>

      <div className="form-container">
        <form onSubmit={handleSubmit} action="/pipelineuiview/submit">
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="clients">Select Client</label>
              <select
                className="form-control"
                id="clients"
                name="clients"
                onChange={handleClientChange}
              >
                <option value="" disabled hidden>
                  Choose a client
                </option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group col">
              <label htmlFor="vessels">Select Vessel</label>
              <select
                className="form-control"
                id="vessels"
                name="vessels"
                onChange={handleVesselChange}
                disabled={!selectedClientId}
              >
                <option value="" disabled hidden>
                  Choose a vessel
                </option>
                {vessels.map((vessel) => (
                  <option key={vessel.id} value={vessel.id}>
                    {vessel.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="parameters">Select Parameters</label>
            <select
              className="form-control"
              id="parameters"
              name="parameters"
              multiple
              value={selectedParameters}
              onChange={(e) => setSelectedParameters(Array.from(e.target.selectedOptions, option => option.value))}
            >
              {selectedParameters.map((parameter) => (
                <option key={parameter.id} value={parameter.id}>
                  {parameter.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="start_date">Start Date</label>
              <DatePicker
                id="start_date"
                name="start_date"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
            </div>

            <div className="form-group col">
              <label htmlFor="end_date">End Date</label>
              <DatePicker
                id="end_date"
                name="end_date"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
            </div>
          </div>

          <div className="form-row justify-content-center">
            <div className="form-group col-md-3">
              <button type="submit" className="btn btn-primary btn-submit">
                Submit
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col">
              <a href="/pipelineuiview/bar_graph" target="_blank" rel="noopener noreferrer">
                Show Bar Graph
              </a>
            </div>

            <div className="form-group col">
              <a href="/pipelineuiview/scatter_plot" target="_blank" rel="noopener noreferrer">
                Show Scatter Plot
              </a>
            </div>

            <div className="form-group col">
              <a href="/pipelineuiview/histogram" target="_blank" rel="noopener noreferrer">
                Show Histogram
              </a>
            </div>

            <div className="form-group col">
              <a href="/pipelineuiview/box_plot" target="_blank" rel="noopener noreferrer">
                Show Box Plot
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AirflowView;