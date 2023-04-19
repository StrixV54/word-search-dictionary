import React from "react";
import Meaning from "./Meaning.js";
import Phonetic from "./Phonetic.js";
import "./Results.css";


export default function Results(props) {
    if (props.results) {
        return <div className="Results">
            <span>
            <h2>{props.results.word}</h2>
            {props.results.phonetics.map((phonetic, index) => {
                return (
                    <div key={index}>
                        <Phonetic phonetic={phonetic} />
                    </div>    
                );
            })}
            </span>
            {props.results.meanings.map((meaning, index) => {
                return (
                    <section key={index}>
                        <Meaning meaning={meaning}/>
                    </section>
                );
            }
            )}
        </div>;
    }
    else {
        return null;
    }

}