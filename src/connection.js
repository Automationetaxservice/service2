/*
//Agregar Localhost, métodos de envío y obtención de datos como confiables para Salesforce
var method = "POST";
var url = "http://localhost:8080";
var xhr = new XMLHttpRequest();
xhr.open(method, url);
xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:8080")
xhr.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
xhr.send();
*/
function conexionSF(){
  var jsforce = require('jsforce');
  var conn = new jsforce.Connection(
    {
      oauth2 : { //Credenciales de Connected App creada en SF Developer
        clientId : '3MVG9_XwsqeYoueI9lW80PulX9gVJAlYn3KNczBnsayfj7xy0u3acv2kRsekXSxvYUjpZuGk1Okc5jkuU.hQf',
        clientSecret : '915737BCC01C5695B6C49FD0CEBBDC51157CFF92970EA9C2BAA6874542CCDA56',
        redirectUri : 'https://francistax.my.salesforce.com/services/oauth2/callback',
        loginUrl: 'https://francistax.my.salesforce.com',
      },
      instanceUrl: 'https://francistax.my.salesforce.com',
      //accessToken: '00D3k000000t52V!AQEAQD3O6rcxpKK8KhnVPdBtJVlqRfPyR9.XM1_aSoTvOfXjqJv79VMw1czQHXsdrHPU7u408b2UXUVhIMzF9dN9DdM6hR7g',
      accessToken: '00D3k000000t52V!AQEAQBm_T.9u6J279yEMILflWOKCeZ9tXFClee73y.cfP_ZA6KEDMH8.eLpDOiDzv2BkuuztHUuBcxsxfUz7Dmzi94uoZKqN'
      //curl -d "username=eautomationdep@francistaxservice.com" -d "password=DashFLTowe16." -d "client_id=3MVG9_XwsqeYoueI9lW80PulX9gVJAlYn3KNczBnsayfj7xy0u3acv2kRsekXSxvYUjpZuGk1Okc5jkuU.hQf" -d "client_secret=915737BCC01C5695B6C49FD0CEBBDC51157CFF92970EA9C2BAA6874542CCDA56" -v -d "grant_type=password" https://francistax.my.salesforce.com/services/oauth2/token

    }
  );
  return conn;
}

export default conexionSF;