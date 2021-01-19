import React from 'react'
import {Tabs, Tab, TabList, TabPanel} from 'react-tabs'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import TabConOne from './TabConOne'
import TabConTwo from './TabConTwo'
import TabConThree from './TabConThree'

class TabNav extends React.Component{
    constructor(){
        super()
        this.state={
            tabIndex : 0
        }
    }

    render(){
        return(
            <>
              <Tabs className="tabs" selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({tabIndex})}>
                  
                  <TabList className="container">
                      <Tab className={`${ this.state.tabIndex === 0 ? 'tab-border' : null}`}>
                        <FontAwesomeIcon icon="door-open" size='3x' />
                        <p className="hide-sm">Cancel at any time</p>
                      </Tab>

                      <Tab className={`${ this.state.tabIndex === 1 ? 'tab-border' : null}`}>
                        <FontAwesomeIcon icon="tablet-alt" size='3x' />
                        <p className="hide-sm">Watch anywhere</p>
                      </Tab>

                      <Tab className={`${ this.state.tabIndex === 2 ? 'tab-border' : null}`}>
                        <FontAwesomeIcon icon="tags" size='3x' />
                        <p className="hide-sm">Pick your price</p>
                      </Tab>
                  </TabList>
 
                  <TabPanel>
                      <TabConOne></TabConOne>
                  </TabPanel>

                  <TabPanel>
                      <TabConTwo></TabConTwo>
                  </TabPanel>

                  <TabPanel>
                      <TabConThree></TabConThree>
                  </TabPanel>
              </Tabs>
            </>
        )
    }
}

export default TabNav