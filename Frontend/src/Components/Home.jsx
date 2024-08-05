import { useEffect, useState } from 'react';
import Navbar from "./Navbar.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import icons from "../Icons.jsx";
import './Home.css';

const Home = () => {
    const [Data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();
    const [empty, setEmpty] = useState(false);

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:3010/categories', {
                params: {
                    search: searchTerm
                }
            });
            setData(response.data);
            response.data.length === 0 ? setEmpty(true) : setEmpty(false);
        } catch (e) {
            console.log(e);
        }
    };

    const getDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:3010/doctors');
            setDoctors(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getData();
        getDoctors();
    }, [searchTerm]);

    useEffect(() => {
        if (doctors.length > 0 && Data.length > 0) {
            const updatedData = Data.map(category => {
                const count = doctors.filter(doctor => doctor.specialization === category.categoryName).length;
                return { ...category, availableDoctors: count };
            });
            setFilteredData(updatedData);
        } else {
            setFilteredData(Data);
        }
    }, [doctors, Data]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClick = (categoryName) => {
        return () => navigate(`/home/${categoryName}`);
    };

    return (
        <>
            <Navbar/>
            <div className='input-box'>
                <input
                    type='search'
                    placeholder='Search...'
                    className='search-bar'
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="bookings">
                {(empty === false) && filteredData.map((item, index) => {
                    const icon = icons[item.iconAddress];
                    return (
                        <div
                            className='box1'
                            key={index}
                            onClick={handleClick(item.categoryName)}
                        >
                            <div className='title'>
                                <img src={icon} className='icon' alt={`${item.categoryName} icon`}/>
                                <p className='category'>{item.categoryName}</p>
                            </div>
                            <div className='detail'>
                                <p className='number'>{item.availableDoctors} doctors available</p>
                                <p className='see-more'>See more</p>
                            </div>
                        </div>
                    );
                })}
                {empty && <p className='empty-home'>{searchTerm} category not found</p>}
            </div>
        </>
    );
};

export default Home;
