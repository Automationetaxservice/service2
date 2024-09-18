function conexionSF(){
  var jsforce = require('jsforce');
  var conn = new jsforce.Connection(
    {
      oauth2 : {
        clientId : '3MVG9_XwsqeYoueI9lW80PulX9gVJAlYn3KNczBnsayfj7xy0u3acv2kRsekXSxvYUjpZuGk1Okc5jkuU.hQf',
        clientSecret : '915737BCC01C5695B6C49FD0CEBBDC51157CFF92970EA9C2BAA6874542CCDA56',
        redirectUri : 'https://francistax.my.salesforce.com/services/oauth2/callback',
        loginUrl: 'https://francistax.my.salesforce.com',
      },
      instanceUrl: 'https://francistax.my.salesforce.com',
      accessToken: '00D3k000000t52V!AQEAQBm_T.9u6J279yEMILflWOKCeZ9tXFClee73y.cfP_ZA6KEDMH8.eLpDOiDzv2BkuuztHUuBcxsxfUz7Dmzi94uoZKqN'
    }
  );
  return conn;
}

export default conexionSF;