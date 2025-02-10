import StatsComponent from "./Component/stats";
import AppointmentDashboard from "./Component/AppointmentDAshboard";
const AppointmentPage = () => {
  return (
    <div className="p-6 space-y-6">
      <StatsComponent title="Total Users" value="12">
        <svg
          width="64"
          height="64"
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <g id="SVGRepo_iconCarrier">
            <path
              fill="#FFFFFF"
              d="M104.6,51.8v35.8c0,4.1-3.2,7.5-7,7.5H29.8c-3.9,0-7-3.4-7-7.5V51.8H104.6z"
            ></path>
          </g>
        </svg>
      </StatsComponent>
      <AppointmentDashboard />
    </div>
  );
};

export default AppointmentPage;
