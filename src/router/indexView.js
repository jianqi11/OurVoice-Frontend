/* eslint-disable */
import { Switch, Route } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import route from './routerList'

const RouterView = props => {
    let routes = (props.route && props.route) || route
    return (
        <Suspense fallback={<div />}>
            <Switch>
                {routes.map(item => {
                    return (
                        <Route
                            key={item.path}
                            path={item.path}
                            render={props => {
                                return <item.component route={item.children} {...props} />
                            }}
                        />
                    )
                })}
            </Switch>
        </Suspense>
    )
}

export default RouterView
