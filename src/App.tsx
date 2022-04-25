import React, {useState, useEffect} from 'react';
import Header from './header';
import {Button, Form, Table} from 'react-bootstrap';
import lodash from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css'; // import react-bootstrap
import './App.css';


function App() {
  type patientData = {age: number, gender: number, bmi: number, Uacid: number, eGFR: number, AKI: number};

  const [genderValue, setGenderValue] = useState<Boolean>();
  const [akiValue, setAkiValue] = useState<Boolean>();
  const [ethValue, setEthValue] = useState<Boolean>();
  const [uacidUnitValue, setUacidUnitValue] = useState<Boolean>(false);
  const [scrUnitValue, setScrUnitValue] = useState<Boolean>(false);

  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [Uacid, setUacid] = useState<string>("");
  const [UacidFloat, setUacidFloat] = useState<number>();
  const [egfr, setEgfr] = useState<string>("");
  const [scr, setScr] = useState<string>("");
  const [scrFloat, setScrFloat] = useState<number>();
  const [calculatedEgfr, setCalculatedEgfr] = useState<string>("");

  const [isresultOn, setIsresultOn] = useState<Boolean>(false);
  const [resultOne, setResultOne] = useState<number>();
  const [resultTwo, setResultTwo] = useState<number>();
  const [resultThree, setResultThree] = useState<number>();
  const [resultFour, setResultFour] = useState<number>();

  const [useScr, setUseScr] = useState<boolean>(false);
  const [formError, setFormError] = useState<Boolean[]>([false, false, false, false, false, false, false, false, false]);
  const [rangeError, setRangeError] = useState<Boolean[]>([false, false, false, false, false, false]);

  const handleAge = (event : any) => {
    let val = event.target.value.replace(/[^0-9]/g, "");
    setAge(val);
  };

  const handleSex = (gend : boolean) => {
    let form_tmp = lodash.cloneDeep(formError);
    form_tmp[1] = false;
    setFormError(form_tmp);
    setGenderValue(gend);
  };

  const handleHeight = (event : any) => {
    let val = event.target.value.replace(/[^0-9.]/g, "");
    if (val.split('.').length -1 <= 1) setHeight(val);
  };

  const handleWeight = (event : any) => {
    let val = event.target.value.replace(/[^0-9.]/g, "");
    if (val.split('.').length -1 <= 1) setWeight(val);
  };

  const handleUacid = (event : any) => {
    let val = event.target.value.replace(/[^0-9.]/g, "");
    if (val.split('.').length -1 <= 1) {
      setUacid(val);
      let tmp = parseFloat(val);
      setUacidFloat(tmp);
    }
  };

  const handleUseScrClick = (check : boolean) => {
    if(check){
      // use Scr to calculate eGFR
      setEgfr("");
      setUseScr(check);
      let form_tmp = lodash.cloneDeep(formError);
      let range_tmp = lodash.cloneDeep(rangeError);
      form_tmp[5] = false;
      range_tmp[4] = false;
      setFormError(form_tmp);
      setRangeError(range_tmp);
    }
    else{
      setScr("");
      setScrFloat(undefined);
      setEthValue(undefined);
      setUseScr(check);
      let form_tmp = lodash.cloneDeep(formError);
      let range_tmp = lodash.cloneDeep(rangeError);
      form_tmp[6] = false;
      form_tmp[7] = false;
      range_tmp[5] = false;
      setFormError(form_tmp);
      setRangeError(range_tmp);
    }
  }

  const handleEgfr = (event : any) => {
    let val = event.target.value.replace(/[^0-9.]/g, "");
    if (val.split('.').length -1 <= 1) setEgfr(val);
  };

  const handleScr = (event : any) => {
    let val = event.target.value.replace(/[^0-9.]/g, "");
    if (val.split('.').length -1 <= 1) {
      setScr(val);
      let tmp = parseFloat(val);
      setScrFloat(tmp);
    }
  };

  const handleUacidUnit = (unit : boolean) => {
    console.log(UacidFloat);
    if(unit === false) {
      if(uacidUnitValue && UacidFloat) {
        try {
          let tmp = UacidFloat/59.48;
          if (tmp>100 || tmp<0) {
            let form_tmp = lodash.cloneDeep(formError);
            let range_tmp = lodash.cloneDeep(rangeError);
            form_tmp[4] = true;
            range_tmp[3] = true;
            setFormError(form_tmp);
            setRangeError(range_tmp);
          }
          else {
            let form_tmp = lodash.cloneDeep(formError);
            let range_tmp = lodash.cloneDeep(rangeError);
            form_tmp[4] = false;
            range_tmp[3] = false;
            setFormError(form_tmp);
            setRangeError(range_tmp);
          }
          setUacidFloat(tmp);
          setUacid(String(tmp.toFixed(2)));
        } catch(error){
          console.log(error);
          alert(error);
        }
      }
      setUacidUnitValue(false);
    }
    else {
      if(!uacidUnitValue && UacidFloat) {
        try {
          let tmp = UacidFloat*59.48;
          if (tmp>5000 || tmp<0) {
            let form_tmp = lodash.cloneDeep(formError);
            let range_tmp = lodash.cloneDeep(rangeError);
            form_tmp[4] = true;
            range_tmp[3] = true;
            setFormError(form_tmp);
            setRangeError(range_tmp);
          }
          else{
            let form_tmp = lodash.cloneDeep(formError);
            let range_tmp = lodash.cloneDeep(rangeError);
            form_tmp[4] = false;
            range_tmp[3] = false;
            setFormError(form_tmp);
            setRangeError(range_tmp);
          }
          setUacidFloat(tmp);
          setUacid(String(tmp.toFixed(2)));
        } catch(error){
          console.log(error);
          alert(error);
        }
      }
      setUacidUnitValue(true);
    }
  };

  const handleScrUnit = (unit : boolean) => {
    if(unit === false) {
      if(scrUnitValue && scrFloat) {
        try {
          let tmp = scrFloat/88.42;
          if (tmp>10 || tmp<0.01) {
            let form_tmp = lodash.cloneDeep(formError);
            let range_tmp = lodash.cloneDeep(rangeError);
            form_tmp[6] = true;
            range_tmp[5] = true;
            setFormError(form_tmp);
            setRangeError(range_tmp);
          }
          else {
            let form_tmp = lodash.cloneDeep(formError);
            let range_tmp = lodash.cloneDeep(rangeError);
            form_tmp[6] = false;
            range_tmp[5] = false;
            setFormError(form_tmp);
            setRangeError(range_tmp);
          }
          setScrFloat(tmp);
          setScr(String(tmp.toFixed(2)));
        } catch(error){
          console.log(error);
          alert(error);
        }
      }
      setScrUnitValue(false);
    }
    else {
      if(!scrUnitValue && scrFloat) {
        try {
          let tmp = scrFloat*88.42;
          if (tmp>1000.000001 || tmp<50){
            let form_tmp = lodash.cloneDeep(formError);
            let range_tmp = lodash.cloneDeep(rangeError);
            form_tmp[6] = true;
            range_tmp[5] = true;
            setFormError(form_tmp);
            setRangeError(range_tmp);
          }
          else {
            let form_tmp = lodash.cloneDeep(formError);
            let range_tmp = lodash.cloneDeep(rangeError);
            form_tmp[6] = false;
            range_tmp[5] = false;
            setFormError(form_tmp);
            setRangeError(range_tmp);
          }
          setScrFloat(tmp);
          setScr(String(tmp.toFixed(2)));
        } catch(error){
          console.log(error);
          alert(error);
        }
      }
      setScrUnitValue(true);
    }
  };

  const handleEth = (eth : boolean) => {
    let form_tmp = lodash.cloneDeep(formError);
    form_tmp[7] = false;
    setFormError(form_tmp);
    setEthValue(eth);
  };

  const handleAki = (aki : boolean) => {
    let form_tmp = lodash.cloneDeep(formError);
    form_tmp[8] = false;
    setFormError(form_tmp);
    setAkiValue(aki);
  };

  const handleAgeFocus = (e: any) => {
    let form_tmp = lodash.cloneDeep(formError);
    let range_tmp = lodash.cloneDeep(rangeError);
    form_tmp[0] = false;
    range_tmp[0] = false;
    setFormError(form_tmp);
    setRangeError(range_tmp);
  }

  const handleAgeblur = (e : any) => {
    let tmp = parseInt(age);
    if (age){
      if (tmp<0 || tmp>150){
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[0] = true;
        range_tmp[0] = true;
        setFormError(form_tmp);
        setRangeError(range_tmp);
      }
      else {
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[0] = false;
        range_tmp[0] = false;
        setFormError(form_tmp);
        setRangeError(range_tmp);
      }
    }
  }

  const handleHeightFocus = (e: any) => {
    let form_tmp = lodash.cloneDeep(formError);
    let range_tmp = lodash.cloneDeep(rangeError);
    form_tmp[2] = false;
    range_tmp[1] = false;
    setFormError(form_tmp);
    setRangeError(range_tmp);
  }

  const handleHeightblur = (e : any) => {
    let tmp = parseFloat(height);
    if (height){
      if (tmp<0 || tmp>300){
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[2] = true;
        range_tmp[1] = true;
        setFormError(form_tmp);
        setRangeError(range_tmp);
      }
      else {
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[2] = false;
        range_tmp[1] = false;
        setFormError(form_tmp);
        setRangeError(range_tmp);
      }
    }
  }

  const handleWeightFocus = (e: any) => {
    let form_tmp = lodash.cloneDeep(formError);
    let range_tmp = lodash.cloneDeep(rangeError);
    form_tmp[3] = false;
    range_tmp[2] = false;
    setFormError(form_tmp);
    setRangeError(range_tmp);
  }

  const handleWeightblur = (e : any) => {
    let tmp = parseFloat(weight);
    if (weight){
      if (tmp<0 || tmp>500){
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[3] = true;
        range_tmp[2] = true;
        setFormError(form_tmp);
        setRangeError(range_tmp);
      }
      else {
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[3] = false;
        range_tmp[2] = false;
        setFormError(form_tmp);
        setRangeError(range_tmp);
      }
    }
  }

  const handleUacidFocus = (e: any) => {
    let form_tmp = lodash.cloneDeep(formError);
    let range_tmp = lodash.cloneDeep(rangeError);
    form_tmp[4] = false;
    range_tmp[3] = false;
    setFormError(form_tmp);
    setRangeError(range_tmp);
  }

  const handleUacidblur = (e : any) => {
    let tmp = parseFloat(Uacid);
    if (Uacid){
      if(!uacidUnitValue){
        if (tmp<0 || tmp>100){
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[4] = true;
          range_tmp[3] = true;
          setFormError(form_tmp);
          setRangeError(range_tmp);
        }
        else {
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[4] = false;
          range_tmp[3] = false;
          setFormError(form_tmp);
          setRangeError(range_tmp);
        }
      }
      else{
        if (tmp<0 || tmp>5000){
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[4] = true;
          range_tmp[3] = true;
          setFormError(form_tmp);
          setRangeError(range_tmp);
        }
        else {
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[4] = false;
          range_tmp[3] = false;
          setFormError(form_tmp);
          setRangeError(range_tmp);
        }
      }
    }
  }

  const handleEGFRblur = (e : any) => {
    let tmp = parseFloat(egfr);
    if (egfr){
      if (tmp<30 || tmp>500){
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[5] = true;
        range_tmp[4] = true;
        setFormError(form_tmp);
        setRangeError(range_tmp);
      }
      else {
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[5] = false;
        range_tmp[4] = false;
        setFormError(form_tmp);
        setRangeError(range_tmp);
      }
    }
  }

  const handleEGFRFocus = (e: any) => {
    let form_tmp = lodash.cloneDeep(formError);
    let range_tmp = lodash.cloneDeep(rangeError);
    form_tmp[5] = false;
    range_tmp[4] = false;
    setFormError(form_tmp);
    setRangeError(range_tmp);
  }

  const handleScrblur = (e : any) => {
    let tmp = parseFloat(scr);
    if (scr){
      if (!scrUnitValue){
        if(tmp<0.01 || tmp>10){
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[6] = true;
          range_tmp[5] = true;
          setFormError(form_tmp);
          setRangeError(range_tmp);
        }
        else{
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[6] = false;
          range_tmp[5] = false;
          setFormError(form_tmp);
          setRangeError(range_tmp);
        }
      }
      else{
        if(tmp<50 || tmp>1000){
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[6] = true;
          range_tmp[5] = true;
          setFormError(form_tmp);
          setRangeError(range_tmp);
        }
        else{
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[6] = false;
          range_tmp[5] = false;
          setFormError(form_tmp);
          setRangeError(range_tmp);
        }
      }
    }
  }

  const handleScrFocus = (e: any) => {
    let form_tmp = lodash.cloneDeep(formError);
    let range_tmp = lodash.cloneDeep(rangeError);
    form_tmp[6] = false;
    range_tmp[5] = false;
    setFormError(form_tmp);
    setRangeError(range_tmp);
  }

  function calculate() {
    let patient_data: patientData;
    let age_tmp: number;
    let gender_tmp: number;
    let height_tmp: number;
    let weight_tmp: number;
    let bmi_tmp: number;
    let Uacid_tmp: number;
    let eGFR_tmp: number;
    let scr_tmp: number;
    let AKI_tmp: number;

    if (age === undefined || age === null || age === ""){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[0] = true;
      setFormError(form_tmp);
      alert("Please Check Age Value");
      return;
    }
    else if (genderValue === undefined || genderValue === null){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[1] = true;
      setFormError(form_tmp);
      alert("Please Check Sex Value");
      return;
    }
    else if (height === undefined || height === null || height === ""){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[2] = true;
      setFormError(form_tmp);
      alert("Please Check Height Value");
      return;
    }
    else if (weight === undefined || weight === null || weight === ""){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[3] = true;
      setFormError(form_tmp);
      alert("Please Check Weight Value");
      return;
    }
    else if (UacidFloat === undefined || UacidFloat === null ){
      let form_tmp = lodash.cloneDeep(formError);
      form_tmp[4] = true;
      setFormError(form_tmp);
      alert("Please Check Uric acid Value");
      return;
    }
    else if (useScr) {
      if (scr === undefined || scr === null || scr === ""){
        let form_tmp = lodash.cloneDeep(formError);
        form_tmp[6] = true;
        setFormError(form_tmp);
        alert("Please Check Serum Creatinine Value");
        return;
      }
      else if (ethValue === undefined || ethValue === null){
        let form_tmp = lodash.cloneDeep(formError);
        form_tmp[7] = true;
        setFormError(form_tmp);
        alert("Please Check Ethinicity Value");
        return;
      }
      else if (akiValue === undefined || akiValue === null){
        let form_tmp = lodash.cloneDeep(formError);
        form_tmp[8] = true;
        setFormError(form_tmp);
        alert("Please Check AKI Value");
        return;
      }
    }
    else {
      if (egfr === undefined || egfr === null || egfr === ""){
        let form_tmp = lodash.cloneDeep(formError);
        form_tmp[5] = true;
        setFormError(form_tmp);
        alert("Please Check eGFR Value");
        return;
      }
      else if (akiValue === undefined || akiValue === null){
        let form_tmp = lodash.cloneDeep(formError);
        form_tmp[8] = true;
        setFormError(form_tmp);
        alert("Please Check AKI Value");
        return;
      }
    }

    try {
      age_tmp = parseFloat(age);
      gender_tmp = Number(genderValue);
      height_tmp = parseFloat(height);
      weight_tmp = parseFloat(weight);
      Uacid_tmp = UacidFloat;

      if(age_tmp<0 || age_tmp>150){
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[0] = true;
        range_tmp[0] = true;
        setFormError(form_tmp);
        setRangeError(range_tmp);
        alert("Please Check Age range");
        return;
      }
      else if(height_tmp<0 || height_tmp>300){
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[2] = true;
        range_tmp[1] = true;
        setFormError(form_tmp);
        setRangeError(range_tmp);
        alert("Please Check Height range");
        return;
      }
      else if(weight_tmp<0 || weight_tmp>500){
        let form_tmp = lodash.cloneDeep(formError);
        let range_tmp = lodash.cloneDeep(rangeError);
        form_tmp[3] = true;
        range_tmp[2] = true;
        setFormError(form_tmp);
        setRangeError(range_tmp);
        alert("Please Check Weight range");
        return;
      }

      if(!uacidUnitValue){
        if(Uacid_tmp<0 || Uacid_tmp>100){
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[4] = true;
          range_tmp[3] = true;
          setFormError(form_tmp);
          setRangeError(range_tmp);
          alert("Please Check Serum uric acid range");
          return;
        }
      }
      else{
        if(Uacid_tmp<0 || Uacid_tmp>5000){
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[4] = true;
          range_tmp[3] = true;
          setFormError(form_tmp);
          setRangeError(range_tmp);
          alert("Please Check Serum uric acid range");
          return;
        }
        Uacid_tmp =  Uacid_tmp/59.48;
      }
      if(!useScr) {
        eGFR_tmp = parseFloat(egfr);
        if(eGFR_tmp < 30 || eGFR_tmp > 500){
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[5] = true;
          range_tmp[4] = true;
          setFormError(form_tmp);
          setRangeError(range_tmp);
          alert("Please Check eGFR range");
          return;
        }
      }
      else{
        scr_tmp = Number(scrFloat);
        if(!scrUnitValue && (scr_tmp < 0.01 || scr_tmp > 10)) {
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[6] = true;
          range_tmp[5] = true;
          setFormError(form_tmp);
          setRangeError(range_tmp);
          alert("Please Check Serum Creatinine range");
          return;
        }
        else if(scrUnitValue && (scr_tmp < 50 || scr_tmp > 1000.000001)){
          let form_tmp = lodash.cloneDeep(formError);
          let range_tmp = lodash.cloneDeep(rangeError);
          form_tmp[6] = true;
          range_tmp[5] = true;
          setFormError(form_tmp);
          setRangeError(range_tmp);
          alert("Please Check Serum Creatinine range");
          return;
        }
        if(scrUnitValue) scr_tmp = scr_tmp/88.42;
        if(!genderValue){
          const k = 0.9;
          const a = -0.411;
          if(!ethValue) eGFR_tmp = 141*(Math.min(scr_tmp/k, 1)**a)*(Math.max(scr_tmp/k, 1)**(-1.209))*(0.993**age_tmp);
          else eGFR_tmp = 141*(Math.min(scr_tmp/k, 1)**a)*(Math.max(scr_tmp/k, 1)**(-1.209))*(0.993**age_tmp)*1.159;
        }
        else{
          const k = 0.7;
          const a = -0.329;
          if(!ethValue) eGFR_tmp = 141*(Math.min(scr_tmp/k, 1)**a)*(Math.max(scr_tmp/k, 1)**(-1.209))*(0.993**age_tmp)*1.018;
          else eGFR_tmp = 141*(Math.min(scr_tmp/k, 1)**a)*(Math.max(scr_tmp/k, 1)**(-1.209))*(0.993**age_tmp)*1.018*1.159;
        }
      }
      AKI_tmp = Number(akiValue);
    } catch (error) {
      console.log(error);
      alert(error);
      return;
    }

    bmi_tmp = weight_tmp / ((height_tmp/100)**2);
    patient_data = {
      age: age_tmp,
      gender: gender_tmp,
      bmi: bmi_tmp,
      Uacid: Uacid_tmp,
      eGFR: eGFR_tmp,
      AKI: AKI_tmp
    }

    getprob_one(patient_data);
    getprob_two(patient_data);
    getprob_three(patient_data);
    getprob_four(patient_data);
    setIsresultOn(true);
    setFormError([false, false, false, false, false, false, false, false, false]);
    setRangeError([false, false, false, false, false, false]);
  }
  
  function getprob_one(data:patientData){
    let prob:number;
    prob = Math.exp(7.062+0.053*data.age.valueOf()-0.022*data.gender.valueOf()+0.088*data.bmi.valueOf()+0.157*data.Uacid.valueOf()-0.157*data.eGFR.valueOf()+1.923*data.AKI.valueOf())/(1+Math.exp(7.062+0.053*data.age.valueOf()-0.022*data.gender.valueOf()+0.088*data.bmi.valueOf()+0.157*data.Uacid.valueOf()-0.157*data.eGFR.valueOf()+1.923*data.AKI.valueOf()));
    prob = parseFloat((prob.valueOf()*100).toFixed(2));
    setResultOne(prob);
  };

  function getprob_two(data:patientData){
    let prob:number;

    prob = Math.exp(9.189+0.06*data.age.valueOf()+0.16*data.gender.valueOf()+0.006*data.bmi.valueOf()+0.136*data.Uacid.valueOf()-0.167*data.eGFR.valueOf()+2.089*data.AKI.valueOf())/(1+Math.exp(9.189+0.06*data.age.valueOf()+0.16*data.gender.valueOf()+0.006*data.bmi.valueOf()+0.136*data.Uacid.valueOf()-0.167*data.eGFR.valueOf()+2.089*data.AKI.valueOf()));
    prob = parseFloat((prob.valueOf()*100).toFixed(2));
    setResultTwo(prob);
  };

  function getprob_three(data:patientData){
    let prob:number;

    prob = Math.exp(7.304+0.059*data.age.valueOf()+0.737*data.gender.valueOf()+0.061*data.bmi.valueOf()+0.047*data.Uacid.valueOf()-0.167*data.eGFR.valueOf()-0.031*data.AKI.valueOf())/(1+Math.exp(7.304+0.059*data.age.valueOf()+0.737*data.gender.valueOf()+0.061*data.bmi.valueOf()+0.047*data.Uacid.valueOf()-0.167*data.eGFR.valueOf()-0.031*data.AKI.valueOf()));
    prob = parseFloat((prob.valueOf()*100).toFixed(2));
    setResultThree(prob);
  };

  function getprob_four(data:patientData){
    let prob:number;

    prob = Math.exp(-8.526+0.073*data.age.valueOf()+0.095*data.gender.valueOf()-0.080*data.bmi.valueOf()+0.241*data.Uacid.valueOf()-0.149*data.eGFR.valueOf()+16.095*data.AKI.valueOf())/(1+Math.exp(-8.526+0.073*data.age.valueOf()+0.095*data.gender.valueOf()-0.080*data.bmi.valueOf()+0.241*data.Uacid.valueOf()-0.149*data.eGFR.valueOf()+16.095*data.AKI.valueOf()));
    prob = parseFloat((prob.valueOf()*100).toFixed(2));
    setResultFour(prob);
  };

  useEffect(() => {
    if(scrFloat!==undefined && age!==undefined && genderValue!==undefined && ethValue!==undefined){
      let age_tmp = parseFloat(age);
      let tmp = scrFloat;
      let eGFR_tmp;
      if(scrUnitValue) tmp = tmp/88.42;
      if(!genderValue){
        const k = 0.9;
        const a = -0.411;
        if(!ethValue) eGFR_tmp = 141*(Math.min(tmp/k, 1)**a)*(Math.max(tmp/k, 1)**(-1.209))*(0.993**age_tmp);
        else eGFR_tmp = 141*(Math.min(tmp/k, 1)**a)*(Math.max(tmp/k, 1)**(-1.209))*(0.993**age_tmp)*1.159;
      }
      else{
        const k = 0.7;
        const a = -0.329;
        if(!ethValue) eGFR_tmp = 141*(Math.min(tmp/k, 1)**a)*(Math.max(tmp/k, 1)**(-1.209))*(0.993**age_tmp)*1.018;
        else eGFR_tmp = 141*(Math.min(tmp/k, 1)**a)*(Math.max(tmp/k, 1)**(-1.209))*(0.993**age_tmp)*1.018*1.159;
      }

      if(eGFR_tmp) setCalculatedEgfr(String(eGFR_tmp.toFixed(2)));
      else setCalculatedEgfr("");
    }
    else {
      setCalculatedEgfr("");
    }
  }, [scrFloat, age, genderValue, ethValue]);

  return (
    <div className="App">
      <Header content_maxheight={2.2}>
        <div style={{display:'flex', flexDirection:'row', alignSelf:'center', alignItems:'center', height: '100%', minWidth:'320px', whiteSpace:'pre-line'}}>
          <div style={{width:'15%'}}>
            <div className='logo'></div>
          </div>
          <div style={{width:'100%', marginTop: '1rem', marginLeft:'1rem', color:'#004C99', fontFamily:'NeoB', fontSize:'1.2rem'}}>Post-nephrectomy kidney outcome prediction for live kidney donors </div>
        </div>
      </Header>
      <div className='Main'>
        <div className='patient-row'>
          <div className='patient-innercol'>
            <p style={{marginTop:'1rem', fontFamily:'NeoB', fontSize:'1.5rem'}}> Patient Information </p>
            <div className='calculator'>
              <div className='patient-input'>
                <Form.Label> Age </Form.Label>
                <div className='right-aligned'>
                  <div style={{width:'65%', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                    <Form.Control className={(formError[0]) ? 'form-control-error' : ''} placeholder='Enter Age' value={age} style={{fontSize:'1rem'}} onFocus={(e) => {handleAgeFocus(e)}} onBlur={(e) => {handleAgeblur(e)}} onChange={(e) => {handleAge(e)}} required/>
                    {rangeError[0]&&(<div className='oor-text'>Out of range! (0~150)</div>)}
                  </div>
                  <div className='unitbox'>
                    <Form.Text style={{fontSize:'0.8rem'}}> (years) </Form.Text>
                  </div>
                </div>
              </div>
              <div className='patient-input'>
                <Form.Label> Sex </Form.Label>
                <div className='right-aligned'>
                  <div className={(formError[1])? "outline":"nooutline"}>
                    <Button variant={(genderValue !== undefined && !genderValue)? 'leftchecked': 'left'} style={{fontSize:'1rem'}} onClick={()=> {handleSex(false)}}>Male</Button>
                    <Button variant={(genderValue !== undefined && genderValue)? 'rightchecked': 'right'} style={{fontSize:'1rem'}} onClick={()=> {handleSex(true)}}>Female</Button>
                  </div>
                </div>
              </div>
              <div className='patient-input'>
                <Form.Label> Height </Form.Label>
                <div className='right-aligned'>
                  <div style={{width:'65%', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                    <Form.Control className={(formError[2]) ? 'form-control-error' : ''} placeholder='Enter Height' value={height} onFocus={(e) => {handleHeightFocus(e)}} onBlur={(e) => {handleHeightblur(e)}} onChange={(e) => {handleHeight(e)}} required/>
                    {rangeError[1]&&(<div className='oor-text'>Out of range! (0~300)</div>)}
                  </div>
                  <div className='unitbox'>
                    <Form.Text style={{fontSize:'0.8rem'}}> (cm) </Form.Text>
                  </div>
                </div>
              </div>
              <div className='patient-input'>
                <Form.Label> Weight </Form.Label>
                <div className='right-aligned'>
                  <div style={{width:'65%', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                    <Form.Control className={(formError[3]) ? 'form-control-error' : ''} placeholder='Enter Weight' value={weight} onFocus={(e) => {handleWeightFocus(e)}} onBlur={(e) => {handleWeightblur(e)}} onChange={(e) => {handleWeight(e)}} required/>
                    {rangeError[2]&&(<div className='oor-text'>Out of range! (0~500)</div>)}
                  </div>
                  <div className='unitbox'>
                    <Form.Text style={{fontSize:'0.8rem'}}> (kg) </Form.Text>
                  </div>
                </div>
              </div>
              <div className='patient-input'>
                <Form.Label> Serum uric acid </Form.Label>
                <div className='right-aligned'>
                  <div style={{width:'65%', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                    <Form.Control className={(formError[4]) ? 'form-control-error' : ''} placeholder='Enter Uric acid' value={Uacid} onFocus={(e) => {handleUacidFocus(e)}} onBlur={(e) => {handleUacidblur(e)}} onChange={(e) => {handleUacid(e)}} required/>
                    {rangeError[3]&&(<div className='oor-text'>{!uacidUnitValue?"Out of range! (0~100)":"Out of range! (0~5000)"}</div>)}
                  </div>
                  <div className='unitbox'>
                    <div style={{width:'70%', minWidth:'76px'}}>
                      <Button variant={(uacidUnitValue !== undefined && !uacidUnitValue)? 'leftcheckedsm': 'leftsm'} style={{fontSize:'0.8rem'}} onClick={()=> {handleUacidUnit(false);}}>mg/dL</Button>
                      <Button variant={(uacidUnitValue !== undefined && uacidUnitValue)? 'rightcheckedsm': 'rightsm'} style={{fontSize:'0.8rem'}} onClick={()=> {handleUacidUnit(true);}}>μmol/L</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='patient-input' id={useScr? "pinput-egfr" : "pinput-egfr-sm"}>
                <Form.Label> eGFR </Form.Label>
                <div style={{display:'flex', flexDirection:'column', height:'100%', width:'70%', justifyContent:'space-between'}}>
                  <div className='right-aligned' style={{width:'100%', height:'25%', alignItems:'flex-start'}}>
                    <div style={{width:'65%', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                      <Form.Control className={(formError[5]) ? 'form-control-error' : ''} placeholder='Enter eGFR' value={egfr} style={{width:'100%', fontSize:'1rem'}} onFocus={(e) => {handleEGFRFocus(e)}} onBlur={(e) => {handleEGFRblur(e)}} onChange={(e) => {handleEgfr(e)}} disabled={useScr}/>
                      {rangeError[4]&&(<div className='oor-text'>Out of range! (30~500)</div>)}
                    </div>
                    <div className='unitbox'>
                      <Form.Text style={{fontSize:'0.8rem', margin:'0', marginLeft:'-0.4rem'}}> (mL/min/1.73 m²)</Form.Text>
                    </div>
                  </div>
                  <Button variant='nooutline' onClick={() => {handleUseScrClick(!useScr)}}>{useScr? "Click to calculate eGFR based on creatinine values ▲" : "Click to calculate eGFR based on creatinine values ▼"}</Button>
                  {useScr && 
                  (<>
                  <div className='right-aligned' style={{width:'100%', height:'30%', alignItems:'flex-start', marginBottom:'4px'}}>
                    <div style={{display:'flex', flexDirection:'column', width:'65%', alignItems:'flex-start'}}>
                      <div style={{fontFamily:'NeoM', textAlign:'left', color:'gray'}}>Serum Creatinine</div>
                        <Form.Control className={(formError[6]) ? 'form-control-error' : ''} placeholder='Enter Serum Creatinine' value={scr} style={{width:'100%'}} onFocus={(e) => {handleScrFocus(e)}} onBlur={(e)=>{handleScrblur(e)}} onChange={(e) => {handleScr(e)}}/>
                        {rangeError[5]&&(<div className='oor-text'>{!scrUnitValue? "Out of range! (0.01~10)": "Out of range! (50~1000)"}</div>)}
                    </div>
                    <div className='unitbox' style={{marginTop:'1.5rem'}}>
                      <div style={{width:'70%', minWidth:'76px'}}>
                        <Button variant={(scrUnitValue !== undefined && !scrUnitValue)? 'leftcheckedsm': 'leftsm'} style={{fontSize:'0.8rem'}} onClick={()=> {handleScrUnit(false);}}>mg/dL</Button>
                        <Button variant={(scrUnitValue !== undefined && scrUnitValue)? 'rightcheckedsm': 'rightsm'} style={{fontSize:'0.8rem'}} onClick={()=> {handleScrUnit(true);}}>μmol/L</Button>
                      </div>
                    </div>
                  </div>
                  <div style={{display:'flex', flexDirection:'column', width:'100%', marginTop:'0.2rem', marginBottom:'4px'}}>
                    <div style={{fontFamily:'NeoM', textAlign:'left', color:'gray'}}>Ethinicity</div>
                    <div style={(formError[7])? {width:'65%', display:'flex', flexDirection:'row', alignItems:'center', borderRadius:'2px', boxShadow:'0 0 0 0.2rem rgb(228, 44, 103)'}: {width:'65%', display:'flex', flexDirection:'row', alignItems:'center', borderRadius:'2px', boxShadow:'0 0 0 0'}}>
                      <Button variant={(ethValue !== undefined && !ethValue)? 'leftchecked': 'left'} style={{fontSize:'1rem'}} onClick={()=> {handleEth(false)}}>Non Black</Button>
                      <Button variant={(ethValue !== undefined && ethValue)? 'rightchecked': 'right'} style={{fontSize:'1rem'}} onClick={()=> {handleEth(true)}}>Black</Button>
                    </div>
                  </div>
                  <div style={{fontFamily:'NeoB', textAlign:'left', color:'black', marginTop:'0.4rem'}}>{"Calculated eGFR "+ calculatedEgfr}</div>
                  </>)
                  }
                </div>
              </div>
              <div className='patient-input' style={{borderBottom:'1px solid black'}}>
                <div style={{display:'flex', flexDirection:'column', fontFamily:'NeoB'}}>
                  <div>Post-nephrectomy</div>
                  <div>Acute Kidney Injury </div>
                </div>
                <div className='right-aligned'>
                  <div style={(formError[8])? {width:'65%', height:'60%', display:'flex', flexDirection:'row', alignItems:'center', borderRadius:'2px', boxShadow:'0 0 0 0.2rem rgb(228, 44, 103)'}: {width:'65%', height:'60%', display:'flex', flexDirection:'row', alignItems:'center', borderRadius:'2px'}}>
                    <Button variant={(akiValue !== undefined && !akiValue)? 'leftchecked': 'left'} style={{fontSize:'1rem'}} onClick={()=> {handleAki(false);}}>No</Button>
                    <Button variant={(akiValue !== undefined && akiValue)? 'rightchecked': 'right'} style={{fontSize:'1rem'}} onClick={()=> {handleAki(true);}}>Yes</Button>
                  </div>
                </div>
              </div>
            </div>
            {isresultOn && (
              <>
                <div style={{display:'flex', flexDirection:'column', alignSelf:'flex-start', fontFamily:'NeoB', border:'2px solid black', padding:'0 4px', marginTop:'0.5rem'}}>Result</div>
                <div className='bottom-col' style={{padding:'8px', marginTop:'0.5rem', justifyContent:'flex-start', border:'2px solid black'}}>
                  <div style={{display:'flex', flexDirection:'column', width:'100%', borderBottom:'1px solid black', alignItems:'flex-start', marginBottom:'1rem'}}>
                    <p> {"1). eGFR < 60 (mL/min/1.73 m²) between 3 months and 6 months"}</p>
                    <p style={{fontFamily:'NeoB'}}>{"Predicted Probability = "+ resultOne+"%"}</p>
                  </div>
                  <div style={{display:'flex', flexDirection:'column', width:'100%', borderBottom:'1px solid black', alignItems:'flex-start', marginBottom:'1rem'}}>
                    <p> {"2). eGFR < 60 (mL/min/1.73 m²) at 1 year"}</p>
                    <p style={{fontFamily:'NeoB'}}>{"Predicted Probability = "+ resultTwo+"%"}</p>
                  </div>
                  <div style={{display:'flex', flexDirection:'column', width:'100%', borderBottom:'1px solid black', alignItems:'flex-start', marginBottom:'1rem'}}>
                    <p> {"3). eGFR < 50 (mL/min/1.73 m²) between 3 months and 6 months"}</p>
                    <p style={{fontFamily:'NeoB'}}>{"Predicted Probability = "+ resultThree+"%"}</p>
                  </div>
                  <div style={{display:'flex', flexDirection:'column', width:'100%', alignItems:'flex-start'}}>
                    <p> {"4). eGFR < 50 (mL/min/1.73 m²) at 1 year"}</p>
                    <p style={{fontFamily:'NeoB'}}>{"Predicted Probability = "+ resultFour+"%"}</p>
                  </div>
                </div>
              </>
              )
            }
            <Button variant="primary" onClick={() => {calculate()}}>Calculate</Button>
          </div>
          <div className='instruction-text'>
            <p style={{marginTop:'1rem', fontFamily:'NeoB', fontSize:'1.2rem'}}> Variable Descriptions </p>
            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', width:'100%'}}>
              <Table>
                <thead style={{fontFamily:'NeoB', fontSize:'1rem', whiteSpace:'nowrap'}}>
                  <tr>
                    <th>Variable</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody className='description-text'>
                  <tr>
                    <td>Age</td>
                    <td>years</td>
                  </tr>
                  <tr>
                    <td>Sex</td>
                    <td>Male or Female</td>
                  </tr>
                  <tr style={{whiteSpace:'nowrap'}}>
                    <td>Height</td>
                    <td>cm</td>
                  </tr>
                  <tr style={{whiteSpace:'nowrap'}}>
                    <td>Weight</td>
                    <td>kg</td>
                  </tr>
                  <tr>
                    <td>Uric acid</td>
                    <td>before nephrectomy</td>
                  </tr>
                  <tr>
                    <td>eGFR</td>
                    <td>Calculated by CKD-EPI equation based on serum creatinine level</td>
                  </tr>
                  <tr>
                    <td>Post-nephrectomy Acute Kidney Injury</td>
                    <td>Serum creatinine elevation ≥ 0.3 mg/dL or ≥ 1.5-fold within 7 days from nephrectomy</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        <div className='bottom-row'>
          <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', width:'100%', marginTop:'1rem'}}>
            <div className='description-text' style={{width:'100%', whiteSpace:'pre-line', alignItems:'flex-start', textAlign:'left'}}>
              <span style={{fontFamily:'NeoB', fontSize:'1rem'}}>Post-nephrectomy kidney outcome prediction for live kidney donors:</span>
              <span style={{fontSize:'1rem'}}>{" The calculation predicts mid-to-long-term kidney outcomes (eGFR decline below < 60 or < 50 mL/min/1.73 ㎡ within 6 months or 1 year after donor-nephrectomy of live kidney donors based on several clinical variables."}</span>
            </div>
          </div>
        </div>
        <div className='bottom-row'>
          <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', width:'100%', marginTop:'1rem'}}>
            <div className='description-text' style={{width:'100%', whiteSpace:'pre-line', alignItems:'flex-start', textAlign:'left'}}>
              <span style={{fontFamily:'NeoB', fontSize:'1rem'}}>Disclaimer:</span>
              <span style={{fontSize:'1rem'}}>{" Please note the risk percentages provided to you are only estimates. The risk estimates are to provide easily interpretable calculation of risks based on several clinical variables, thus, there may be other factors affecting patient outcome. This information should not replace the advice of an attending doctor or healthcare provider about the diagnosis, treatment, or potential outcomes. The provider is not responsible for medical decisions that may be made based on the risk calculator estimates, since these estimates are provided for informational purposes. Patients should always consult their doctor or other health care provider before deciding on a treatment plan."}</span>
            </div>
          </div>
        </div>
        <div className='bottom-row'>
          <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', width:'100%', marginTop:'1rem'}}>
            <div className='description-text' style={{width:'100%', whiteSpace:'pre-line', alignItems:'flex-start', textAlign:'left'}}>
              <span style={{fontFamily:'NeoB', fontSize:'1rem'}}>Permission of usage:</span>
              <span style={{fontSize:'1rem'}}>{" This calculator has been developed from the Division of Nephrology, Department of Internal Medicine, Seoul National University Hospital. An external platform (e.g., an electronic health record) may open the online-access of this calculator in a new browser window. However, we do not permit the calculator to appear as an integrated feature of any external platform, nor do we permit the functionality of the calculator to be automated in any way. The calculator must be presented in its original, unaltered form, maintaining all SNUH branding and copyright information."}</span>
            </div>
          </div>
        </div>
        <div className='bottom-row'>
          <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', width:'100%', marginTop:'1rem', border:'1px solid black', padding:'8px', marginBottom:'1rem'}}>
            <p style={{fontFamily:'NeoB', fontSize:'1rem'}}>Acute kidney injury risk calculation models</p>
            <a href="https://probabilitycalculator-e767e.firebaseapp.com" style={{fontSize:'0.8rem'}}>Simple-Postoperative AKI Risk (SPARK) Classification after non-cardiac surgery</a>
            <a href="https://probabilitycalculator-e767e.firebaseapp.com" style={{fontSize:'0.8rem'}}>Post-nephrectomy kidney outcome prediction for live kidney donors</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
