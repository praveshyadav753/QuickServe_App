import React, { useState, useEffect } from "react";

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  if (isOnline) return null; // Don't render anything if online

  return (
    // <div style={{ background: "red", color: "white", padding: "10px", textAlign: "center" }}>
    //   {/* ⚠️ No Internet Connection! Please check your network. */}
    // </div>

    
    <div className="fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center text-center z-50">
    
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEwUlEQVR4nO2c7YsbRRzHhwqJiHAoIn0n6J/gi0p9QvEBMaI0F+VCiy98AAu79qScl1UJSj0PSzOzgvdaMpM3R2biG4W2nuSi4BsFRfClqIj4xvY8r61X205ZuZzhzCazm92dnczvA/MmZC8738/s3uzszCAEAAAAAAAAAAAAAAAAAEAofqtzN6Hi7KnV1VvDvwWkFj6m/BxhQhImvgEJ+sLvF5CgMXyQMA6ftY8QJq6GBPf/QsVyxPBBQhik2SkTyv9RDn+IBNz8+AChYkPlOMz46dCTsQ3c7DyDmbgcOfwBCYotv//9jUCW7nrnAtxqP44p/zt2+P+16EsQfkRIkz+KmVALLoliY8uv1+v7hn1OWuI+wvgWhJ8ipZfrN8063mezTs0Z/Nxvdg5iKv6C8FMOv+zW1mZdT8663rW+hOAWgBn/E8LPLnzZl3B44Z06Yfx8VuEH/9ytu+eXhoe/K8F5l6xn1vr3PCfYHr4ECSlTdr2VMeHvSnCXSBeuhISpvrJ4S9n1vlaVkPXtCNlANccSkC1UcyoB2UQ1hxKQbVRzJgHZyO+f3P7WQv0FmQcJyDbkeuG4XC/KrbMzMg8SkI3hy52SBwnI1vBlTiQgm8OXO2XzzMyvc8cWvtchAdkevuwWfpFrxbui9o7cE6SXgICraJqRiuHr6KJiKq4QKp5HZo1qeitzr9VvSyP8LCXshH8YGTmk7HjfjZMgY4afiQQqtjETh5DR4/kjJMheoTQm/J/lF8U7x/1uKhKo2PaZeBpNxcuUEAlSon2yW/goTstPVQIVF30qHkNT9SbLiSAhYvhJSsCMX2i02o8gU6hUKjcovEaUO+XbsRJihj8oIf5zAt/yWfshZBrlV2sv/Tt1RKXSzqgrofi+yj1/FHLtxjs2z8z8FPmJmYoNn/J7kKkkIWFSgvBlt/BjnGGLYMoLMp0jtbcXdUmQA+HHHTvaOwPPxMVsf8wv+72sJcgh4VslocHa9w5OF8xSghwRfr/89un+peB3VM4n6FAEHQtkCpi1HyCMb+7tzmUhQSqEL9cLb0boovYqR+s3I5MWRwQPLWEPNGlKkBHC7zNGgmHhM/GEyuKINCRIlfC7hTeGHRsiwazwCROlKMuCkpQgJwg/RIJZ4ftUPBtnQdx8QhJkt3hyzG1nUaUewd8vO7UPg2EUZAqYirlYS0ETlCBHD+CNbPnGE2kRdEg59t4Hn6ciYdrDD5g0fJLWlWBD+EkKIElK6BVKyBaSFEAyfmKeCpIWQECCfgEEJOgXQECCfgEEJOgXQECCfgEkooSyU/uhcvT4fmQDWQkgIGE4uMVfz1KCu+R/qXwluN4KsoGsJcyr3Y7MGlKeMgk9q8Lf3bMngX3aiHLh50OmvNgXfn/6SYbhbzVo5/4hk7/sDF95a8cECmb8gt8SDw6eQyCh7HpdCD9tAVRcbDT5w1E28ptasm75hIrtBuVP6q63ieFPvIcnZuJyo9V5Sne9c0HU7XyD6d2TdFExFVcwaz+nu965IdigWjX8wd0F40jAwWpE1q7qrXHOWF5dncFMfKXS8vceG0UCpvxag/IX9dTSZAmmryoxWoKNG1nnRgKEr1MCPw0tHwAAAAAAAAAAAAAAAADQSK4DilRSjddJYecAAAAASUVORK5CYII=" alt="disconnected"></img>
      <h1 className="text-3xl font-bold text-red-600 mt-4">OOPS!</h1>
      <p className="text-lg font-semibold text-gray-900">No Internet Connection!</p>
      <p className="text-gray-600 mx-8 mt-2">
        Your internet connection is down. Please fix it and then you can continue.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:bg-red-700 transition"
      >
        Try Again
      </button>
    </div>  
  );
};

export default NetworkStatus;
