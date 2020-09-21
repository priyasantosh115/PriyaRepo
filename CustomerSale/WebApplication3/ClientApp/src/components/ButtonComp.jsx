import React, { useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import {makeStyles} from '@semantic-ui/core/styles'
import React,{ Component} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'semantic-ui-css/semantic.min.css'
import { Button } from 'semantic-ui-react';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bootstraptable from 'react-bootstrap-table-next';

const Appp=()=>{
  const[players,setPlayers]=useState([]);
  const[loading,setLoading]=useState(false);
  const getPlayer=async()=>{
    try{
      const data=await axios.get("https://nba-players.herokuapp.com/players-stats");
      console.log(data);
    }catch(e){
      console.log(e);
    }
  };
  const columns=[
    {dataField:"name",text:"Player Name"}
  ]
  useEffect(()=>{
    getPlayer();
  },[]);

  return <div className="Appp"></div>;
};