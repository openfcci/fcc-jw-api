const sdk = require('api')('@jwp-platform/v1.0#5jjp925ulkvczvf9');

const siteIdSports = 'SITE_ID_HERE';
const querySports = 'hosting_type%3A%20hosted';

const siteIdOriginals = 'SITE_ID_HERE';
const queryOriginals = 'hosting_type%3A%20hosted%20AND%20tags%3A%20%28agweektv%20OR%20agweektvclips%29';

const siteIdWday = 'SITE_ID_HERE';
const queryWday = 'hosting_type%3A%20%22hosted%22%20AND%20NOT%20tags%3A%20%22weather%20wednesday%22';
const queryWdayFree = 'hosting_type%3A%20%22hosted%22%20AND%20tags%3A%20%22weather%20wednesday%22';

const siteIdWeather = 'SITE_ID_HERE';
const queryWeather = 'hosting_type%3A%20%22hosted%22%20AND%20%28tags%3A%20%22wdayweather%22%20OR%20tags%3A%20%22inforumweather%22%29';


const siteId = siteIdWeather;
const query = queryWeather;

const requestLimit = 60; // Set your API request limit here
const delayBetweenRequests = 1100; // Set the delay in milliseconds between requests

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


sdk.auth('ADMIN_API_KEY_HERE');
sdk.getV2SitesSite_idMedia({
  page: '1',
  page_length: '10',
  q: query,
  sort: 'publish_start_date%3Aasc',
  site_id: siteId
})
.then(async ({ data }) => {
  console.log('Total items:', data.media.length);

  for (const item of data.media) {
    try {
      let updatedCustomParams = {};

      if (!item.metadata.custom_params || Object.keys(item.metadata.custom_params).length === 0) {
        updatedCustomParams = {
          requires_authentication: 'false',
          contentType: 'free',
          free: 'true'
        };
      } else {
        const params = item.metadata.custom_params;
        updatedCustomParams = {
          ...params,
          requires_authentication: 'false',
          contentType: 'free',
          free: 'true'
        };
      }

      console.log('custom params are:', item.metadata.custom_params);
      console.log('custom params after update are:', updatedCustomParams);

      await sdk.patchV2SitesSite_idMediaMedia_id(
        {
          metadata: {
            custom_params: updatedCustomParams
          }
        },
        {
          site_id: siteId,
          media_id: item.id
        }
      );

      console.log('Custom param updated for media_id:', item.id);
      // Implement rate limiting by adding a delay between requests
      await sleep(delayBetweenRequests);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error(`Error updating custom params for media_id ${item.id}:`, error.response.data);
      } else {
        console.error(`Error updating custom params for media_id ${item.id}:`, error);
      }
    }
  }
})
.catch(err => console.error(err));