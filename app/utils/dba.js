import Q from 'q';
import cordovaSQLite from './sqlitePlugin';

const DBA = {
  query: function(query, parameters) {
    parameters = parameters || [];
    let q = Q.defer();
    cordovaSQLite.execute(db, query, parameters).then(
      result => {
        q.resolve(result);
      },
      function(error) {


        console.log(error);
        q.reject(error);
      },
    );
    return q.promise;
  },
  execute: function(sql, parameters) {
    let q = Q.defer();
    parameters = parameters || [];

    cordovaSQLite.execute(db, sql, parameters).then(
      result => {
        q.resolve(result);
      },
      function(error) {


        console.log(error);
        q.reject(error);
      },
    );
    return q.promise;
  },
  executeBatch: function(sqlsAndBindings) {
    let q = Q.defer();
    cordovaSQLite.executeBatch(db, sqlsAndBindings).then(
      () => {
        q.resolve();
      },
      error => {


        console.log(error);
        q.reject(error);
      },
    );
    return q.promise;
  },
  // Proces a result set
  getAll: function(result) {
    let output = [];
    for (let i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }

    return output;
  },
};

export default DBA;
