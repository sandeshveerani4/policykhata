import Realm from 'realm';
const {UUID} = Realm.BSON;
export const KhataSchema = {
  name: 'Khata',
  properties: {
    _id: 'string',
    address: 'string?',
    cnic: 'int?',
    compensateamount: {type: 'int?', default: 0},
    contactnumber: 'string?',
    dateofbirth: {type: 'date?', default: new Date()},
    dateofcommencement: {type: 'date?', default: new Date()},
    dateofissued: {type: 'date?', default: new Date()},
    fatherorhusbandname: 'string?',
    gender: 'string?',
    maturity: 'int?',
    mode: 'string?',
    nextpolicydate: 'date?',
    nominee: 'string?',
    nomineecnic: 'int?',
    nomineedateofbirth: {type: 'date?', default: new Date()},
    paidamount: {type: 'int?', default: 0},
    placeofbirth: 'string?',
    policyduration: 'int?',
    policyholdername: 'string?',
    policynumber: 'string?',
    policyplan: 'string?',
    paidarray: '{}',
    alertdate: 'date?',
    nextduedate: 'date?',
    policyyear: 'string?',
    fib: 'string?',
    aib: 'string?',
    adb: 'string?',
    premiumamount: {type: 'int?', default: 0},
    previouspolicyamount: 'int?',
    previouspolicyissueddate: {type: 'date?', default: new Date()},
    previouspolicynumber: 'string?',
    relation: 'string?',
    staffname: 'string?',
    sumassured: 'int?',
    table: 'string?',
    term: 'string?',
    paydone: {type: 'bool', default: false},
    whatsappnumber: 'int?',
  },
  primaryKey: '_id',
};
const config = {
  path: 'khatarealm',
  schema: [KhataSchema],
  schemaVersion: 28,
};
export function getPolicies() {
  try {
    const realm = new Realm(config);
    const tasks = realm.objects('Khata');
    return tasks;
  } catch (error) {
    console.log('An error occured', error);
  }
}
export function sumAmount(setSum, field = '') {
  Realm.open(config).then(realm => {
    const tasks =
      field == ''
        ? realm.objects('Khata').sum('premiumamount')
        : realm.objects('Khata').filtered(field).sum('premiumamount');
    setSum(tasks);
    return () => {
      realm.close();
    };
  });
}
export function addSumListener(setSum, field = '') {
  Realm.open(config).then(realm => {
    const tasks = realm.objects('Khata').sum(field);
    setSum(tasks);
    return () => {
      realm.close();
    };
  });
}
export function addCountListener(setCount, query = '') {
  Realm.open(config).then(realm => {
    const tasks =
      query == ''
        ? realm.objects('Khata')
        : realm.objects('Khata').filtered(query);
    setCount(tasks.length);
    return () => {
      realm.close();
    };
  });
}
export function addListener(setFunction) {
  Realm.open(config).then(realm => {
    const tasks = realm.objects('Khata');
    setFunction([...tasks]);
    try {
      tasks.addListener(() => {
        setFunction([...tasks]);
      });
    } catch (error) {
      console.error(
        `Unable to update the tasks' state, an exception was thrown within the change listener: ${error}`,
      );
    }
    return () => {
      tasks.removeAllListeners();
      realm.close();
    };
  });
}
export function addDueListener(setFunction) {
  Realm.open(config).then(realm => {
    const tasks = realm
      .objects('Khata')
      .filtered('$0 >= alertdate and paydone==false', new Date());
    setFunction([...tasks]);
    try {
      tasks.addListener(() => {
        setFunction([...tasks]);
      });
    } catch (error) {
      console.error(
        `Unable to update the tasks' state, an exception was thrown within the change listener: ${error}`,
      );
    }
    return () => {
      tasks.removeAllListeners();
      realm.close();
    };
  });
}
export function getPolicy(id, setFunction) {
  Realm.open(config).then(realm => {
    const tasks = realm.objects('Khata').filtered(`_id='${id}'`)[0];
    setFunction(tasks);
    return () => {
      realm.close();
    };
  });
}
export function payUpdate(id, installment, newdate, dateofiss) {
  Realm.open(config).then(realm => {
    realm.write(() => {
      var obj = realm.objects('Khata').filtered('_id=$0', id)[0];
      if (installment + 1 == obj.policyduration) {
        obj.paydone = true;
      }
      obj.paidarray[installment] = newdate;
      obj.alertdate = new Date(
        dateofiss.setMonth(dateofiss.getMonth() + 10 * (installment + 1)),
      );
    });
    return () => {
      realm.close();
    };
  });
}
export function updatePolicy(obj) {
  Realm.open(config).then(realm => {
    realm.write(() => {
      realm.create('Khata', obj, Realm.UpdateMode.Modified);
    });
    return () => {
      realm.close();
    };
  });
}

export function updateRealm(func, obj) {
  const realm = new Realm(config);

  realm.addListener('change', () => func(obj));
  realm.close();
}
export function deletePolicy(obj) {
  Realm.open(config).then(realm => {
    realm.write(() => {
      realm.delete(obj);
    });
    return () => {
      realm.close();
    };
  });
}
export function searchListener(setFunction, text) {
  Realm.open(config).then(realm => {
    const tasks = realm
      .objects('Khata')
      .filtered(
        'policyholdername CONTAINS[c] $0 || policynumber CONTAINS[c] $0 || policyyear CONTAINS[c] $0',
        text,
      );
    setFunction([...tasks]);
    return () => {
      realm.close();
    };
  });
}

export function createNewPolicy(data) {
  try {
    const realm = new Realm(config);
    realm.write(() => {
      console.log(data);
      realm.create('Khata', {
        _id: String(new UUID()),
        ...data,
      });
    });
    realm.close();
  } catch (error) {
    console.log('An error occured', error);
  }
}
