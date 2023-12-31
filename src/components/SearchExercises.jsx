import React, { useEffect, useState } from 'react';
import HorizontalScrollbar from './HorizontalScrollbar';
import { exerciseOptions, fetchData } from '../utils/fetchData';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {

    const [search, setSearch] = useState('');
    const [bodyParts, setBodyParts] = useState([]);

    useEffect(() => {
        const fetchExercisesData = async () => {
            const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

            setBodyParts(['all', ...bodyPartsData]);
        };

        fetchExercisesData();
    }, []);

    const handleSearch = async () => {
        if (search) {
            const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
            const searchedExercises = exercisesData.filter((item) =>
                item.name.toLowerCase().includes(search)
                || item.name.toLowerCase().includes(search)
                || item.target.toLowerCase().includes(search)
                || item.equipment.toLowerCase().includes(search)
                || item.bodyPart.toLowerCase().includes(search)
            );

            window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' })

            setSearch('');
            setExercises(searchedExercises);
        };
    };

    return (
        <div className='mt-10 md:mt-16 pt-10 '>
            <div className='flex items-center justify-center'>
                <h1 className='font-bold text-xl md:text-4xl capitalize'>exercises you should know</h1>
            </div>
            <div className='flex items-center justify-center'>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder='Search Exercises . . .' className='my-5 md:my-8 w-3/5 p-2.5 md:p-3 text-xs md:text-lg border-s-4 border-red-600 bg-slate-900 text-white capitalize placeholder:normal-case outline-none rounded-md md:rounded-lg border-r-0 placeholder:text-gray-500' />
                <button className='px-3 py-2.5 md:px-7 md:py-3 border-none -ml-2 md:-ml-4 bg-red-600 hover:bg-red-500 text-white text-xs md:text-lg font-bold rounded md:rounded-md italic tracking-wide' onClick={handleSearch}>Search</button>
            </div>
            <div>
                <HorizontalScrollbar data={bodyParts} bodyParts bodyPart={bodyPart} setBodyPart={setBodyPart} />
            </div>
        </div>
    )
}

export default SearchExercises;
