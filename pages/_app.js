import React from 'react'
import '../css/styles.css'
import Layout from '../components/Layout'

const MyApp = ({ Component, pagerProps }) =>
{
  return (
    <Layout>
      <Component {...pagerProps} />
    </Layout>
  )
}
export default MyApp
