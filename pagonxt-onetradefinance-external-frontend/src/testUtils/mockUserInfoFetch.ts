import fetchMockJest from 'fetch-mock-jest';

const defaultUserResponse = {
  arguments: [],
  entity: {
    country: 'ES',
    mail: 'office@mail.com',
    middleOffice: null,
    office: '1234',
    userDisplayedName: 'Office',
    userId: 'office',
    userType: 'OFFICE',
  },
  key: 'userInfoFound',
  message: null,
  type: 'success',
};

export const mockUserInfoFetch = (
  mockedResponse: any = defaultUserResponse,
) => {
  fetchMockJest.mock(/user-info/, JSON.stringify(mockedResponse), {
    overwriteRoutes: true,
  });

  return mockedResponse;
};
