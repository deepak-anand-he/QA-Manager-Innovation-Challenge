import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  OutlinedInput,
  CircularProgress,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateRangePicker } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';
// Import credentials from a properties file (e.g., src/config/jira.properties.js)
import jiraConfig from '../../config/jira.properties';

const JIRA_API_URL = 'https://pgga-es.atlassian.net/rest/api/3/project/search';

const fetchProjects = async () => {
  const { username, apiToken } = jiraConfig;
  const response = await fetch(JIRA_API_URL, {
    headers: {
      'Authorization': 'Basic ' + btoa(`${username}:${apiToken}`),
      'Accept': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch projects');
  const data = await response.json();
  return data.values || data.projects || [];
};

const ProjectStatusModule = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchProjects()
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not fetch projects. Check proxy or credentials.');
        setLoading(false);
      });
  }, []);

  // Select All logic
  const allProjectNames = projects.map((p) => p.name || p.key);
  const isAllSelected =
    allProjectNames.length > 0 &&
    allProjectNames.every((name) => selectedProjects.includes(name));
  const isIndeterminate =
    selectedProjects.length > 0 && !isAllSelected;

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedProjects([...new Set([...selectedProjects, ...allProjectNames])]);
    } else {
      setSelectedProjects(selectedProjects.filter((name) => !allProjectNames.includes(name)));
    }
  };

  const handleProjectChange = (event) => {
    setSelectedProjects(event.target.value);
  };

  return (
    <Box
      sx={{
        paddingX: '200px',
        paddingY: '100px',
        color: 'black',
        fontSize: '20px',
        background: 'white',
      }}
    >
      {/* Multi-Select Checkbox and Date Picker at the same level */}
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 8, mb: 6 }}>
        {/* Multi-Select Checkbox (Left) */}
        <Box sx={{ minWidth: 300, paddingLeft: '100px', paddingRight: '100px' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Select Projects</Typography>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Select
              multiple
              displayEmpty
              value={selectedProjects}
              onChange={handleProjectChange}
              input={<OutlinedInput />}
              renderValue={selected => selected.length === 0 ? "Select Projects" : selected.join(', ')}
              sx={{ width: 250, background: 'white' }}
              MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
            >
              <MenuItem>
                <Checkbox
                  indeterminate={isIndeterminate}
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
                <ListItemText primary="Select All" />
              </MenuItem>
              {projects.map((project) => {
                const name = project.name || project.key;
                return (
                  <MenuItem key={project.id} value={name}>
                    <Checkbox checked={selectedProjects.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                );
              })}
            </Select>
          )}
        </Box>

        {/* Date Range Picker (Center Right) */}
        <Box sx={{ flex: 1, paddingLeft: '100px', paddingRight: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Select Date Range</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              localeText={{ start: 'Start date', end: 'End date' }}
              sx={{ width: '100%', mb: 2 }}
            />
          </LocalizationProvider>
        </Box>
      </Box>

      {/* Table Container below the selectors */}
      <Paper
        sx={{
          backgroundColor: '#FFF9DB', // Pastel Yellow
          border: '2px solid #E2E2E2',
          p: '15px',
          width: '100%',
          minHeight: 120,
          mt: 2,
          display: 'flex',
          flexDirection: 'row',
          gap: 4,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        {/* TextArea1: Start Date */}
        <Box
          sx={{
            background: 'teal',
            color: 'white',
            p: '5px',
            height: '100px',
            width: '200px',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginLeft: '150px',
          }}
        >
          <Typography sx={{ fontSize: '14px', textAlign: 'center', width: '100%' }}>
            Start Date
          </Typography>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Typography sx={{ fontSize: '20px', textAlign: 'center', width: '100%' }}>
              {dateRange[0]
                ? dayjs(dateRange[0]).format('MMMM D, YYYY')
                : 'Not selected'}
            </Typography>
          </Box>
        </Box>
        {/* TextArea2: End Date */}
        <Box
          sx={{
            background: '#8B008B', // dark magenta
            color: 'white',
            p: '5px',
            height: '100px',
            width: '200px',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginRight: '150px',
          }}
        >
          <Typography sx={{ fontSize: '14px', textAlign: 'center', width: '100%' }}>
            End Date
          </Typography>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Typography sx={{ fontSize: '20px', textAlign: 'center', width: '100%' }}>
              {dateRange[1]
                ? dayjs(dateRange[1]).format('MMMM D, YYYY')
                : 'Not selected'}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProjectStatusModule;