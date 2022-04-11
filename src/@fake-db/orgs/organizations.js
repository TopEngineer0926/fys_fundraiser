import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

const data = {
  organizations: [
    {
      id: 4987,
      issuedDate: '13 Dec 2019',
      client: {
        address: '7777 Mendez Plains',
        company: 'Hall-Robbins PLC',
        companyEmail: 'don85@johnson.com',
        country: 'USA',
        contact: '(616) 865-4180',
        name: 'Jordan Stevenson'
      },
      service: 'Software Development',
      total: 3428,
      avatar: '',
      organizationStatus: 'Paid',
      balance: '$724',
      dueDate: '23 Apr 2019'
    },
    {
      id: 4988,
      issuedDate: '17 Jul 2019',
      client: {
        address: '04033 Wesley Wall Apt. 961',
        company: 'Mccann LLC and Sons',
        companyEmail: 'brenda49@taylor.info',
        country: 'Haiti',
        contact: '(226) 204-8287',
        name: 'Stephanie Burns'
      },
      service: 'UI/UX Design & Development',
      total: 5219,
      avatar: require('@src/assets/images/avatars/10-small.png').default,
      organizationStatus: 'Downloaded',
      balance: 0,
      dueDate: '15 Dec 2019'
    },
    {
      id: 4989,
      issuedDate: '19 Oct 2019',
      client: {
        address: '5345 Robert Squares',
        company: 'Leonard-Garcia and Sons',
        companyEmail: 'smithtiffany@powers.com',
        country: 'Denmark',
        contact: '(955) 676-1076',
        name: 'Tony Herrera'
      },
      service: 'Unlimited Extended License',
      total: 3719,
      avatar: require('@src/assets/images/avatars/1-small.png').default,
      organizationStatus: 'Paid',
      balance: 0,
      dueDate: '03 Nov 2019'
    }
  ]
}

// ------------------------------------------------
// GET: Return Organization List
// ------------------------------------------------
mock.onGet('/orgs/organization/organizations').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1, status = null, sort, sortColumn } = config
  /* eslint-enable */

  const dataAsc = data.organizations.sort((a, b) => {
    if (a[sortColumn]) {
      return a[sortColumn] < b[sortColumn] ? -1 : 1
    } else {
      const splitColumn = sortColumn.split('.')
      const columnA = a[splitColumn[0]][splitColumn[1]]
      const columnB = b[splitColumn[0]][splitColumn[1]]
      return columnA < columnB ? -1 : 1
    }
  })

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const queryLowered = q.toLowerCase()
  const filteredData = dataToFilter.filter(organization => {
    if (String('paid').includes(queryLowered) && organization.balance === 0) {
      return organization.balance === 0
    } else {
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      return (
        (organization.client.companyEmail.toLowerCase().includes(queryLowered) ||
          organization.client.name.toLowerCase().includes(queryLowered) ||
          String(organization.id).toLowerCase().includes(queryLowered) ||
          String(organization.total).toLowerCase().includes(queryLowered) ||
          String(organization.balance).toLowerCase().includes(queryLowered) ||
          organization.dueDate.toLowerCase().includes(queryLowered)) &&
        organization.organizationStatus.toLowerCase() === (status.toLowerCase() || organization.organizationStatus.toLowerCase())
      )
    }
  })
  /* eslint-enable  */

  return [
    200,
    {
      allData: data.organizations,
      total: filteredData.length,
      organizations: filteredData.length <= perPage ? filteredData : paginateArray(filteredData, perPage, page)
    }
  ]
})

// ------------------------------------------------
// GET: Return Single Organization
// ------------------------------------------------
mock.onGet(/\/api\/organization\/organizations\/\d+/).reply(config => {
  // // Get event id from URL
  const organizationId = Number(config.url.substring(config.url.lastIndexOf('/') + 1))

  const organizationIndex = data.organizations.findIndex(e => e.id === organizationId)
  const responseData = {
    organization: data.organizations[organizationIndex],
    paymentDetails: {
      totalDue: '$12,110.55',
      bankName: 'American Bank',
      country: 'United States',
      iban: 'ETD95476213874685',
      swiftCode: 'BR91905'
    }
  }
  return [200, responseData]
})

// ------------------------------------------------
// DELETE: Deletes Organization
// ------------------------------------------------
mock.onDelete('/orgs/organization/delete').reply(config => {
  // Get organization id from URL
  let organizationId = config.id

  // Convert Id to number
  organizationId = Number(organizationId)

  const organizationIndex = data.organizations.findIndex(t => t.id === organizationId)
  data.organizations.splice(organizationIndex, 1)

  return [200]
})

// ------------------------------------------------
// GET: Return Clients
// ------------------------------------------------
mock.onGet('/api/organization/clients').reply(() => {
  const clients = data.organizations.map(organization => organization.client)
  return [200, clients.slice(0, 5)]
})
