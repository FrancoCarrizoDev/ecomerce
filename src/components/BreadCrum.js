import { Breadcrumb } from 'react-bootstrap'
import { useLocation } from '../../node_modules/react-router-dom/cjs/react-router-dom.min'
export const BreadCrum = () => {
  const location = useLocation()
  const [, ...breadCumList] = location.pathname.split('/')

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href='#'>INICIO</Breadcrumb.Item>
        {breadCumList.map((breadCrum) => (
          <Breadcrumb.Item href='#' key={`breadCrumList-${breadCrum}`}>
            {breadCrum.toUpperCase()}
          </Breadcrumb.Item>
        ))}
        {/* <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
          Library
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Data</Breadcrumb.Item> */}
      </Breadcrumb>
    </div>
  )
}
