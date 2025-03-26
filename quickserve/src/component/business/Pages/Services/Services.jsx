import React, { useEffect } from "react";
import Navigationtrail from "../../components/navigationTrail/Navigationtrail";
import PageTitle from "../../../../pagetitle/pagetitle";
import ServicesHeader from "../../components/servicescomponent/ServicesHeader";
import { useNavigate } from "react-router";
import useApi from "../../../../apihook";
import { useDispatch,useSelector } from "react-redux";
import { setService } from "../../../../features/reducers/ServiceSlice";

function Services() {
  const dispatch = useDispatch();
  const { data, loading } = useApi("/service/services/?role=business");
  useEffect(() => {
    if (data && !loading) {
      dispatch(setService(data.services)); 
    }
  }, [data, loading, dispatch]);

  const navigate = useNavigate();
  const servicedata = data?.services || [];

  return (
    <>
      <PageTitle title="Services" />
      <Navigationtrail pageName="Services" />
      <ServicesHeader />

      <div className="mt-5 dark:text-white">
        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : servicedata.length === 0 ? (
          <div className="text-center text-gray-500">Please Add a Service</div>
        ) : (
          <ul className="grid sm:grid-cols-1 lg:grid-cols-1 gap-5">
            {servicedata.map((service) => (
              <li
                key={service.id}
                className="flex  sm:flex-row items-center gap-5 p-5 border rounded-lg bg-white dark:bg-gray-700 shadow-sm"
              >
                <img
                  className="w-20 h-20 object-cover rounded-md border bg-gray-300"
                  src={service?.image_url || "/placeholder.png"}
                />
                <div className="flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold">
                    {service.service_name}
                  </h2>
                  <p>{service.total_reviews}(Reviews)</p>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.price}
                </p>

                <button
                  className="p-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                  onClick={() =>
                    navigate(`service-setting/${service.service_id}`)
                  }
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Services;
