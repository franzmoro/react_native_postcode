'use strict';

require('babel-core/register')({presets:['react-native']});
require('isomorphic-fetch');
const test = require('tape');
const nock = require('nock');
const syncFlow = require('sync-flow');
const reducers = require('../../app/reducers/index.js');
const configStore = require('../../app/configure_store.js');

test('UNIT:CONFIG -> create store', t => {
  const actions = require('../../app/actions/index.js')({
    reactModules: {
      alert:() => {},
      dismissKeyBoard: () => {}
    }
  });
  const { getState } = configStore({ reducers,actions });
  const exec = [
    () => {
      t.deepEqual(
        getState().toJS(),
        require('../_fixtures/raw_state.json'),
        'inital state is correct'
      );
      t.end();
    }
  ];
  syncFlow(exec,t.end,200);
});

test('UNIT:ACTIONS -> change postcode input', t => {
  const actions = require('../../app/actions/index.js')({
    reactModules:{
      alert:() => {},
      dismissKeyBoard: () => {}
    }
  });
  const {dispatch,getState} = configStore({reducers,actions});
  const exec = [
    () => {
      dispatch(actions.changePostcodeInput('E2 0SY'));
    },
    () => {
      const {form} = getState().toJS();
      t.equal(form.postcode,'E2 0SY','state with right postcode');
      t.end();
    }
  ];
  syncFlow(exec,t.end,200);
});

test('UNIT:ACTIONS -> address api return error', t => {
  t.plan(2);
  const actions = require('../../app/actions/index.js')({
    reactModules: {
      alert: {
        alert: (title,bodyText) => {
          t.equal(title, 'Address Not Found','got right title');
          t.equal(
            bodyText,
            'Please check your postcode and try again!','got right message'
          );
        }
      },
      dismissKeyBoard: () => {}
    }
  });
  const { dispatch } = configStore({ reducers,actions });
  nock.cleanAll();
  nock('https://api.getaddress.io').get(() => {
    return true;
  }).reply(400, { Message: 'Bad Request' });
  const exec = [
    () => {
      dispatch(actions.changePostcodeInput('E2 0SY'));
    },
    () => {
      dispatch(actions.getAddresses());
    },
    () => {
      t.end();
    }
  ];
  syncFlow(exec,t.end,200);
});

test('UNIT:ACTIONS -> actions get address over network', t => {
  const actions = require('../../app/actions/index.js')({
    reactModules: {
      alert:() => {},
      dismissKeyBoard: () => {}
    }
  });
  const {dispatch,getState} = configStore({reducers,actions});
  nock.cleanAll();
  nock('https://api.getaddress.io').get(uri => {
    t.equal(
      uri,
      '/v2/uk/E2%200SY?api-key=svmmX8qdGkms9--Jwlzl5w3660','right uri'
    );
    return true;
  }).reply(200, require('../_fixtures/getaddress.json'));
  const exec = [
    () => {
      dispatch(actions.changePostcodeInput('E2 0SY'));
    },
    () => {
      dispatch(actions.getAddresses());
    },
    () => {
      const { addresses } = getState().toJS();
      t.equal(
        addresses.options.raw.length,
        42,
        'right number of raw options'
      );
      t.equal(
        addresses.options.parsed.length,
        42,
        'right number of parsed options'
      );
      dispatch(actions.selectAddress(1));
    },
    () => {
      t.deepEqual(
        getState().toJS(),
        require('../_fixtures/select_address.json'),
        'selected correct address'
      );
      t.end();
    }
  ];
  syncFlow(exec, t.end, 200);
});
