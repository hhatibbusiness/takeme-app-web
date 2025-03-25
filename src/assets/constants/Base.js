/// Here we define the base constant for the API URL

export const Server = "app_test"

export const BaseURL = `http://191.96.1.25:8080/${Server}/endpoints`

export const AUTH_TOKEN = `Bearer ${localStorage.getItem('TAKEME_TOKEN')}`


