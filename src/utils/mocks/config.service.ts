const mockedConfigService = {
  get(key: string) {
    switch(key) {
      case 'JWT_EXPIRATION_TIME':
        return 60 * 60
    }
  }

}

export default mockedConfigService;