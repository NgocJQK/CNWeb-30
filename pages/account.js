import Menu from "@/components/dashboard/menu";
import Layout from "@/components/layout";
import React, { useState, useEffect } from "react";
import NewClass from "@/components/new-class"
import Cookies from "universal-cookie";
import validToken from "@/services/validToken";
import Link from "next/link";

function Account() {
  const cookies = new Cookies();
  const [token, setToken] = useState(cookies.get("TOKEN"))

  useEffect(() => {
    const token = cookies.get("TOKEN");
    if (validToken(token)) {
      setToken(token);
    } else {
      setToken(null);
    }

  }, [token]);

  return (
    <Layout pageTitle="New Class | Dashboard">
      <div className="dashboard bg-[#212121] h-screen bg-center bg-cover bg-no-repeat flex items-center">
        {token ? (
          <>
            <div className="main-container">
              <button onClick={() => {
                cookies.remove("TOKEN");
                setToken(null)
                  ;
              }}>
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="main-container">
              <div className="content">
                <p>You are not logged in. Please log in to continue.</p>
                <Link href="/login">Log In</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Account;
