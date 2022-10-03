import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { awaitExpression } from '@babel/types';


function DisplayTable(props) {
   const [table, setTable] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const [showAdd, setShowAdd] = useState(false);
   const [name, setName] = useState('');
   const [password, setPassword] = useState('');
   const [role, setRole] = useState('');
   const [roleOpts, setRoleOpts] = useState([]);
   const [errorMessage, setErrorMessage] = useState('');
   useEffect(()=> {
    setLoading(true)
    axios.get('http://localhost:4000/api/users/getUser').then((res)=>{
       setTable(res.data)
       setLoading(false)
    }).then(
       res => { 
        axios.get('http://localhost:4000/api/role/getAllRoles').then(
            result => {
                setRoleOpts(result.data)
            }
         ).catch(
            error => {
                setLoading(false)
                setError(error)
            }
         )
        }
    ).catch(error => {
        setError(error)
    })
   }, [])

   const handleRole = (e) => {
       setRole(e.target.value)
   }

   const handleSelect = (e) => {
       let input = {
         'name': table[e]
       }
   }

   const handleAddRole = () => {
       setLoading(true)
       axios.post('http://localhost:4000/api/role/createRole', {'role': role}).then(
           res => {
               setRole('')
               setLoading(false);
           }
       ).then(
           res => {
             axios.get('http://localhost:4000/api/role/getAllRoles').then(
                result => {
                    setRoleOpts(result.data)
                }
             ).catch(
                error => {
                    setLoading(false)
                    setError(error)
                }
             )
           }
       ).catch(
           error => {
               debugger
               setError(error);
               setLoading(false)
           }
       )
   }

   const submitDate = () => {
       let obj = {
           'name':name,
           'password': password
       }
       setLoading(true)
       axios.post('http://localhost:4000/api/users/createUser', obj).then(
         res => {
             setLoading(false)
             setShowAdd(false)
         }
       ).then(
           res => {
            axios.get('http://localhost:4000/api/users/getUser').then((res)=>{
                setTable(res.data)
                setLoading(false)
             }).catch(error => {
                 setError(error)
             })
           }
       ).catch(
         error => {
             setError(error)
             setShowAdd(false)
         }
       )
   }
   return(
    <div>
    {(table && !error) && <div className="container">
       
      <div className="role__container">
        <div>
            角色名称:<input value={role} onChange={handleRole}/>
            <button onClick={handleAddRole}>添加角色</button>
        </div>
        <div>
            <button onClick={()=>setShowAdd(true)}>添加用户</button>
        </div>
        {showAdd && <div className="addUser__container">
            <div>name:<input onChange={(e) => {setName(e.target.value)}}/></div>
            <div>password<input onChange={(e) => {setPassword(e.target.value)}}/></div>
            <div><button onClick={submitDate}>submit</button><button onClick={()=>setShowAdd(false)}>cancel</button></div>
        </div>}
      </div>
      <div className="table__container">
       <table>
           <thead>
               <tr>
                   <td>User Name</td>
                   <td>Set role</td>
                   <td>Role</td>
              </tr>
           </thead>
           <tbody>
               {table.map((el, index) => {
                   return(
                       <tr key={index}>
                            <td>{el.name}</td>
                            <td>
                                <select onChange={(e) => {
                                    let input = {
                                        'name': table[index].name,
                                        'role': e.target.value
                                    }
                                    setLoading(true)
                                    axios.put('http://localhost:4000/api/users/addRole', input).then(
                                       res => {
                                           
                                       }
                                    ).then(
                                        res => {
                                            axios.get('http://localhost:4000/api/users/getUser').then((res)=>{
       setTable(res.data)
       setLoading(false)
    })
                                        }
                                    ).catch(
                                       error => {
                                           setErrorMessage('角色已存在')
                                           setError(error)
                                           setLoading(false)
                                       }
                                    )
                                }}>
                                 {roleOpts && roleOpts.length > 0 && roleOpts.map((el, index)=> {
                                     return <option key={el} value={el}>{el}</option>
                                 })}
                                </select>
                            </td>
                            {el.role && <td>{el.role}</td>}
                       </tr>
                   )
               })}
           </tbody>
       </table>
       </div>
    </div>}
    {loading && <div>loding...</div>}
    {errorMessage && <div>error... {errorMessage}</div>}
    </div>
   )
}

export default DisplayTable;