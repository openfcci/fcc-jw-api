const sdk = require('api')('@jwp-platform/v1.0#5jjp925ulkvczvf9');

sdk.auth('jpP_C6yJ3E3bW_qVlHmVxWInZFU1T1pVeEdTMU50VEhkM1QybEpUVEpJYURNeGVsbzAn');
sdk.getV2SitesSite_idMedia({
  page: '1',
  page_length: '10',
  q: 'hosting_type%3A%20hosted',
  sort: 'created%3Adsc',
  site_id: 'BqhOriBR'
})
.then(({ data }) => {
  data.media.forEach(item => {
    const params = item.metadata.custom_params; // Adjust this based on the structure of the response
    const updatedCustomParams = {
        ...params,
        requires_authentication: 'true'
      };
      sdk.patchV2SitesSite_idMediaMedia_id({
        metadata: {
          custom_params: updatedCustomParams
          
        }
      }, {
        site_id: 'BqhOriBR',
        media_id: item.id
      })

    console.log('Custom param setup:', updatedCustomParams);
  });
})
.catch(err => console.error(err));

