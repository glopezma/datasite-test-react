import { observer } from "mobx-react";
import * as React from "react";
import { useEffect } from "react";
import "./App.css";
import { UserStore } from "./store/user/user.store";

const App = observer(() => {
  useEffect(() => {
    UserStore.setUsers();
  }, []);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {UserStore.isGettingUsers ?? <div className="loading">Loading...</div>}
      <div className="app-wrapper">
        {UserStore.users.map((user) => (
          <pre className="card" key={user.id}>
            <p>{JSON.stringify(user, null, 2)}</p>
          </pre>
        ))}
      </div>
    </React.Suspense>
  );
});

export default App;
