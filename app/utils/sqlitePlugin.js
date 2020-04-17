import Q from 'q';

const cordovaSQLite = {
  openDB: (options, background) => {
    if (typeof options === 'object' && typeof options !== 'string') {
      if (typeof background !== 'undefined') {
        options.bgType = background;
      }
      return window.sqlitePlugin.openDatabase(options);
    }

    return window.sqlitePlugin.openDatabase({
      name: options,
      bgType: background
    });
  },

  execute: (db, sql, binding) => {
    let q = Q.defer();
    db.transaction(function(tx) {
      tx.executeSql(
        sql,
        binding,
        function(tx, result) {
          q.resolve(result);
        },
        function(transaction, error) {
          q.reject(error);
        }
      );
    });
    return q.promise;
  },

  executeBatch: (db, sqlsAndBindings) => {
    let q = Q.defer();
    db.transaction(
      function(tx) {
        for (let sql of sqlsAndBindings) {
          if (typeof sql === 'string') {
            tx.executeSql(sql);
          } else if (Array.isArray(sql)) {
            tx.executeSql(sql[0], sql[1]);
          }
        }
      },
      function(err) {
        q.reject(err);
      },
      function() {
        q.resolve();
      }
    );
    return q.promise;
  }
};

export default cordovaSQLite;
