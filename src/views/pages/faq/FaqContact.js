// ** Icons Imports
import { Smartphone, Mail } from 'react-feather'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody } from 'reactstrap'

const FaqContact = () => {
  return (
    <div className='faq-contact'>
      <Row className='mt-5 pt-75'>
        <Col className='text-center' sm='12'>
          <h2>Have a question?</h2>
          <p className='mb-3'>
            If you are having trouble with our site and need assistance, please contact us by one of the methods below. We will answer to you shortly!
          </p>
        </Col>
        <Col sm='6'>
          <Card className='text-center faq-contact-card shadow-none py-1'>
            <CardBody>
              <div className='avatar avatar-tag bg-light-primary mb-2 mx-auto'>
                <Smartphone size={18} />
              </div>
              <h4><a href="sms:5109885931">510-988-5931</a></h4>
              <span className='text-body'>Text us your questions!</span>
            </CardBody>
          </Card>
        </Col>
        <Col sm='6'>
          <Card className='text-center faq-contact-card shadow-none py-1'>
            <CardBody>
              <div className='avatar avatar-tag bg-light-primary mb-2 mx-auto'>
                <Mail size={18} />
              </div>
              <h4><a href="mailto:support@fundyouthsports.zendesk.com">support@fundyouthsports.zendesk.com</a></h4>
              <span className='text-body'>The best way to get your answer fast!</span>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default FaqContact
