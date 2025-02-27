"use client";

import { useState, useEffect } from "react";
import Card from "../../components/Card";
import Loader from "../../components/Loader";

interface Question {
  question: string;
  name: string;
  options: [];
}

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [formData, setFormData] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/api/gift-suggestions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log(data);
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data

    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Questions:", data); // Log the fetched data
        setQuestions(data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching (whether success or error)
      });
  }, []);

  return (
    <div className="h-full mx-auto text-center w-2/3 py-10 ">
      {loading ? (
        <Loader />
      ) : (
        <>
          <form className=" xs:w-full " onSubmit={handleSubmit}>
            <div className="flex gap-12 flex-wrap justify-around items-center py-10">
              {questions.map(({ question, options }) => (
                <Card
                  key={question}
                  question={question}
                  options={options}
                  onChange={handleChange}
                />
              ))}
            </div>
            <button
              className="bg-[peru] text-white p-2 rounded hover:bg-stone-200 hover:text-yellow-800"
              type="submit"
            >
              Submit
            </button>
          </form>
          {suggestions.length > 0 && (
            <div className="flex w-3/4  overflow-hidden bg-white shadow-lg max-w-96 rounded-xl p-5">
              <svg width="16" height="96" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 8 0 
               Q 4 4.8, 8 9.6 
               T 8 19.2 
               Q 4 24, 8 28.8 
               T 8 38.4 
               Q 4 43.2, 8 48 
               T 8 57.6 
               Q 4 62.4, 8 67.2 
               T 8 76.8 
               Q 4 81.6, 8 86.4 
               T 8 96 
               L 0 96 
               L 0 0 
               Z"
                  fill="tan"
                  stroke="tan"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
              </svg>{" "}
              <div className="mx-2.5 overflow-hidden w-full">
                <p className="mt-1.5 text-xl font-bold text-[peru] leading-8 mr-3 overflow-hidden text-ellipsis whitespace-nowrap">
                  Gift Suggestions:
                </p>{" "}
                {suggestions.map((suggestion, index) => (
                  <p
                    className="overflow-hidden leading-5 break-all text-zinc-400 max-h-10"
                    key={index}
                  >
                    {suggestion}
                  </p>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
