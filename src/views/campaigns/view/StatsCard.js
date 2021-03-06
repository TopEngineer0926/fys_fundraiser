// ** Third Party Components
import classnames from 'classnames'
import { TrendingUp, User, Box } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'

const StatsCard = ({ cols, selectedUser }) => {

  function formatNumber(formatValue) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(formatValue)
  }

  // let totalDonations = Object.values(selectedUser.donations).reduce((r, { donationAmount }) => r + donationAmount, 0)
  // totalDonations = Math.floor(totalDonations / 100)
  // const avgDonation = Math.floor(totalDonations / selectedUser.donations.length)

  const data = [
    {
      title: selectedUser.teams.length,
      subtitle: 'Teams',
      color: 'light-primary',
      icon: <TrendingUp size={24} />,
      col: 2
    },
    {
      title: selectedUser.fundraisers.length,
      subtitle: 'Players',
      color: 'light-info',
      icon: <User size={24} />,
      col: 2
    },
    {
      title: selectedUser.currentDonors,
      subtitle: 'Donors',
      color: 'light-info',
      icon: <User size={24} />,
      col: 2
    },
    {
      title: `${formatNumber(selectedUser.currentDonations.toFixed(0))}`,
      subtitle: 'Dontations',
      color: 'light-danger',
      icon: <Box size={24} />,
      col: 3
    },
    {
      title: `${formatNumber(selectedUser.averageDonation.toFixed(0))}`,
      subtitle: 'Average',
      color: 'light-danger',
      icon: <Box size={24} />,
      col: 2
    }
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-2`]: index !== data.length - 1
          })}
        >
          <div className='d-flex align-items-center'>
            <Avatar color={item.color} icon={item.icon} className='me-2' />
            <div className='my-auto'>
              <h4 className='fw-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>Statistics</CardTitle>
        <CardText className='card-text font-small-2 me-25 mb-0'>Updated 10 minutes ago</CardText>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
