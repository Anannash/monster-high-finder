import { useState } from "react";
import { set, url, z } from "zod";
import useCharacters from "../hooks/useCharacters";
import useListings from "../hooks/useListings";
import { ConditionEnum, CurrencyEnum, MarketplaceEnum } from "../utils/Enums";

const CreateListing = () => {
  const useCharactersData = useCharacters();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moreLinks, setMoreLinks] = useState([""]);
  // State to manage the list of dolls in the listing
  const [infoDoll, setInfoDoll] = useState([
    {
      image_url: "",
      condition: "",
      price: "",
      id_collection: "",
    },
  ]);

  // Function to add a new doll to the same listing
  const addNewDoll = () => {
    setInfoDoll([
      ...infoDoll,
      {
        image_url: "",
        condition: "",
        price: "",
        id_collection: "",
      },
    ]);
  };
  // Function to remove a doll from the listing
  const removeDoll = (index) => {
    setInfoDoll(infoDoll.filter((_, i) => i !== index));
  };
  // Function to add a new marketplace link
  const addNewLink = () => {
    setMoreLinks([...moreLinks, ""]);
  };
  // Function to remove a marketplace link
  const removeLink = (index) => {
    setMoreLinks(moreLinks.filter((_, i) => i !== index));
  };

  const handleImageChange = (index, value) => {
    const updatedCharacters = [...infoDoll];

    updatedCharacters[index].image_url = value;

    setInfoDoll(updatedCharacters);
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    currency: "",
    image_url: [""],
    urls: [""],
    marketplaces: [""],
    characters: [{ condition: "new", id_collection: "" }],
  });

  return (
    <div>
      {/* Principal Title */}
      <div className="flex justify-center shadow-sm items-center h-20 mb-6">
        <h1 className="text-3xl font-bold">Create a new listing</h1>
      </div>

      <form className="max-w-2xl mx-auto p-4 shadow-md rounded-md mb-10">
        {/* GENERAL INFORMATION */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="title"
            name="title"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
            required
          />
          <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Tittle:
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            type="text"
            id="description"
            name="description"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
            required
          />
          <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Description:
          </label>
        </div>
        {/* BUTTONS TO ADD OR REMOVE LINKS */}
        {moreLinks.map((newLink, index) => (
          <div key={index}>
            <div className="flex justify-end">
              {index === moreLinks.length - 1 && (
                <button type="button" onClick={addNewLink}>
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M14 7H16C18.7614 7 21 9.23858 21 12C21 14.7614 18.7614 17 16 17H14M10 7H8C5.23858 7 3 9.23858 3 12C3 14.7614 5.23858 17 8 17H10M8 12H16"
                        stroke="#96509f"
                        strokeWidth="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>{" "}
                </button>
              )}

              {index > 0 && (
                <button type="button" onClick={() => removeLink(index)}>
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M14 6C13.4477 6 13 6.44772 13 7C13 7.55228 13.4477 8 14 8V6ZM10 18C10.5523 18 11 17.5523 11 17C11 16.4477 10.5523 16 10 16V18ZM14 16C13.4477 16 13 16.4477 13 17C13 17.5523 13.4477 18 14 18V16ZM8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13V11ZM3.70711 2.29289C3.31658 1.90237 2.68342 1.90237 2.29289 2.29289C1.90237 2.68342 1.90237 3.31658 2.29289 3.70711L3.70711 2.29289ZM20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L20.2929 21.7071ZM19.4115 14.0898C19.1224 14.5604 19.2696 15.1763 19.7402 15.4653C20.2108 15.7544 20.8266 15.6072 21.1157 15.1366L19.4115 14.0898ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11V13ZM7.08376 7.08376L7.79087 6.37666L7.08376 7.08376ZM8 16C5.79086 16 4 14.2091 4 12H2C2 15.3137 4.68629 18 8 18V16ZM16 8C18.2091 8 20 9.79086 20 12H22C22 8.68629 19.3137 6 16 6V8ZM14 8H16V6H14V8ZM10 16H8V18H10V16ZM16 16H14V18H16V16ZM20 12C20 12.7678 19.7846 13.4823 19.4115 14.0898L21.1157 15.1366C21.6767 14.2232 22 13.1478 22 12H20ZM8 13H12V11H8V13ZM2.29289 3.70711L6.37666 7.79087L7.79087 6.37666L3.70711 2.29289L2.29289 3.70711ZM6.90166 6.10048C4.11245 6.61703 2 9.06076 2 12H4C4 10.0423 5.40739 8.41122 7.26586 8.06704L6.90166 6.10048ZM6.37666 7.79087L16.2091 17.6233L17.6233 16.2091L7.79087 6.37666L6.37666 7.79087ZM16.2091 17.6233L20.2929 21.7071L21.7071 20.2929L17.6233 16.2091L16.2091 17.6233ZM16.7341 15.933C16.4969 15.9769 16.2516 16 16 16V18C16.3743 18 16.7415 17.9656 17.0983 17.8995L16.7341 15.933Z"
                        fill="#ff5c95"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id={`marketplaces-${index}`}
                name="marketplaces"
                className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                placeholder=" "
                required
              />
              <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                Marketplace Link:
              </label>
            </div>
          </div>
        ))}
        <h2 className="font-bold italic">Doll(s):</h2>
        {/* INFORMATION X DOLL*/}
        {infoDoll.map((newDoll, index) => (
          <section key={index} className="shadow-md p-4 rounded-md mb-6 ">
            {/* BUTTONS TO ADD OR REMOVE DOLLS */}
            <div className="flex justify-end">
              {index === infoDoll.length - 1 && (
                <button type="button" onClick={addNewDoll}>
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g id="Edit / Add_Row">
                        {" "}
                        <path
                          id="Vector"
                          d="M3 14V15C3 16.1046 3.89543 17 5 17L19 17C20.1046 17 21 16.1046 21 15L21 13C21 11.8954 20.1046 11 19 11H13M10 8H7M7 8H4M7 8V5M7 8V11"
                          stroke="#96509f"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </button>
              )}

              {index > 0 && (
                <button type="button" onClick={() => removeDoll(index)}>
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ff5c95"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g id="Edit / Delete_Row">
                        {" "}
                        <path
                          id="Vector"
                          d="M14 16H20M21 10V9C21 7.89543 20.1046 7 19 7H5C3.89543 7 3 7.89543 3 9V11C3 12.1046 3.89543 13 5 13H11"
                          stroke="#ff5c95"
                          strokeWidth="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </button>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id={`character-${index}`}
                name="character"
                className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                placeholder=" "
                required
              />
              {/**USAR UN SELECT */}
              <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                Character Name:
              </label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  id={`gen-${index}`}
                  name="gen"
                  className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                  placeholder=" "
                  required
                />
                {/**USAR UN SELECT */}
                <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                  Generation:
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  id={`collection-${index}`}
                  name="collection"
                  className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                  placeholder=" "
                  required
                />
                {/**USAR UN SELECT */}
                <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                  Collection:
                </label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  id={`price-${index}`}
                  name="price"
                  value={newDoll.price}
                  className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                  placeholder=" "
                  required
                />
                <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                  Price:
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  id={`currency-${index}`}
                  name="currency"
                  className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                  required
                >
                  <option value="" disabled selected>
                    Select currency
                  </option>
                  {Object.values(CurrencyEnum).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
                <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                  Currency:
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  id={`image_url-${index}`}
                  name="image_url"
                  value={newDoll.image_url}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                  placeholder=" "
                  required
                />
                <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                  Image URL:
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  id={`condition-${index}`}
                  name="condition"
                  className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                  required
                >
                  <option value="" disabled selected>
                    Select condition
                  </option>

                  {Object.values(ConditionEnum).map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
                <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                  Condition:
                </label>
              </div>
            </div>
            <div className="flex flex-col items-center w-full mb-5">
              <label className="text-sm text-body mb-2">Image Preview:</label>
              {newDoll.image_url && (
                <img
                  src={newDoll.image_url}
                  alt="preview"
                  className="w-48 h-48  object-cover rounded-md"
                />
              )}
            </div>
          </section>
        ))}
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white bg-blue-500 box-border border border-transparent rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;
