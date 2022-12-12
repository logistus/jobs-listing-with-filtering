import './App.css'
import data from './data.json'
import { useState } from 'react'

function App() {
  const [jobs, setJobs] = useState(data)
  const [filters, setFilters] = useState([])

  const addFilter = (type, value) => {
    if (type === 'role') {
      const tempFilters = { ...filters }
      tempFilters.role = value
      setFilters(tempFilters)
      const oldJobs = [...jobs]
      const filteredJobs = oldJobs.filter(job => job.role === value)
      setJobs(filteredJobs)
    } else if (type === 'level') {
      const tempFilters = { ...filters }
      tempFilters.level = value
      setFilters(tempFilters)
      const oldJobs = [...jobs]
      const filteredJobs = oldJobs.filter(job => job.level === value)
      setJobs(filteredJobs)
    } else if (type === 'language') {
      const languages = filters.languages ?? []
      if (!languages.find(language => language === value)) {
        const tempFilters = { ...filters }
        tempFilters.languages = [...languages, value]
        setFilters(tempFilters)
        const oldJobs = [...jobs]
        const filteredJobs = oldJobs.filter(job => job.languages.includes(value))
        setJobs(filteredJobs)
      }
    } else if (type === 'tool') {
      const tools = filters.tools ?? []
      if (!tools.find(tool => tool === value)) {
        const tempFilters = { ...filters }
        tempFilters.tools = [...tools, value]
        setFilters(tempFilters)
        const oldJobs = [...jobs]
        const filteredJobs = oldJobs.filter(job => job.tools.includes(value))
        setJobs(filteredJobs)
      }
    }
  }

  const removeFilter = (type, value) => {
    const tempFilters = { ...filters }

    if (type === 'role') {
      delete tempFilters.role
      setFilters(tempFilters)
    } else if (type === 'level') {
      delete tempFilters.level
      setFilters(tempFilters)
    } else if (type === 'language') {
      tempFilters.languages.splice(tempFilters.languages.indexOf(value), 1)
      if (tempFilters.languages.length === 0)
        delete tempFilters.languages
      setFilters(tempFilters)
    } else if (type === 'tool') {
      tempFilters.tools.splice(tempFilters.tools.indexOf(value), 1)
      if (tempFilters.tools.length === 0)
        delete tempFilters.tools
      setFilters(tempFilters)
    }

    console.log(tempFilters)

    if (Object.keys(tempFilters).length === 0) {
      setJobs(data)
      setFilters([])
    } else {
      if (tempFilters.role) {
        let newJobs = []
        for (let i = 0; i < data.length; i++) {
          if (data[i].role === tempFilters.role) {
            newJobs.push(data[i])
          }
        }
        setJobs(newJobs)
      } else if (tempFilters.level) {
        let newJobs = []
        for (let i = 0; i < data.length; i++) {
          if (data[i].level === tempFilters.level) {
            newJobs.push(data[i])
          }
        }
        setJobs(newJobs)
      } else if (tempFilters.languages && tempFilters.languages.length > 0) {
        let newJobs = []
        for (let i = 0; i < data.length; i++) {
          for (let k = 0; k < tempFilters.languages.length; k++) {
            if (data[i].languages.includes(tempFilters.languages[k])) {
              newJobs.push(data[i])
            }
          }
        }
        setJobs(newJobs)
      } else if (tempFilters.tools && tempFilters.tools.length > 0) {
        let newJobs = []
        for (let j = 0; j < data.length; j++) {
          for (let m = 0; m < tempFilters.tools.length; m++) {
            if (data[j].tools.includes(tempFilters.tools[m])) {
              newJobs.push(data[j])
            }
          }
        }
        console.log(newJobs)
        setJobs(newJobs)
      }
    }
  }

  const clearFilters = (e) => {
    e.preventDefault()
    setFilters([])
    setJobs(data)
  }

  return (
    <>
      <header></header>
      <div className='container'>
        {(filters.role || filters.level || filters.languages || filters.tools) ? <div className="filters--wrapper">
          <div className='filters'>
            {filters.role &&
              <div className='filter'>
                {filters.role} <a href="#" onClick={() => removeFilter('role', filters.role)} className='filter--remove'><img src="/images/icon-remove.svg" alt="" /></a>
              </div>}
            {filters.level &&
              <div className='filter'>
                {filters.level} <a href="#" onClick={() => removeFilter('level', filters.level)} className='filter--remove'><img src="/images/icon-remove.svg" alt="" /></a>
              </div>}
            {filters.languages && filters.languages.map(language =>
              <div className='filter' key={language}>
                {language} <a href="#" onClick={() => removeFilter('language', language)} className='filter--remove'><img src="/images/icon-remove.svg" alt="" /></a>
              </div>)}
            {filters.tools && filters.tools.map(tool =>
              <div className='filter' key={tool}>
                {tool} <a href="#" onClick={() => removeFilter('tool', tool)} className='filter--remove'><img src="/images/icon-remove.svg" alt="" /></a>
              </div>)}
          </div>
          <a href="#" onClick={clearFilters} className="filters--clear">Clear</a>
        </div> : ''}
        <div className="jobs">
          {jobs.map(job =>
            <div className={`job ${job.featured ? 'featured' : ''}`} key={job.id}>
              <img src={job.logo} alt={job.company} height={50} className='job--logo' />
              <div className="job--details">
                <div>
                  <span className='job--company'>
                    {job.company}
                  </span>
                  {job.new && <span className='job--stat job--new'>NEW!</span>}
                  {job.featured && <span className='job--stat job--featured'>Featured</span>}
                </div>
                <a href="#" className='job--position'>{job.position}</a>
                <ul className='job--info'>
                  <li>{job.postedAt}</li>
                  <li>{job.contract}</li>
                  <li>{job.location}</li>
                </ul>
              </div>
              <hr />
              <div className='job--labels'>
                <button type='button' className='job--label' onClick={() => addFilter('role', job.role)}>{job.role}</button>
                <button type='button' className='job--label' onClick={() => addFilter('level', job.level)}>{job.level}</button>
                {job.languages.map(language => <button type='button' key={language} onClick={() => addFilter('language', language)} className='job--label'>{language}</button>)}
                {job.tools ? job.tools.map(tool => <button type='button' key={tool} onClick={() => addFilter('tool', tool)} className='job--label'>{tool}</button>) : ''}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
