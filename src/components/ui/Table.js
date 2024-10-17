import React from 'react';

const Table = ({ headers, data, renderRow}) => {
    return (
        <div className="table-responsive text-start" style={{ margin: '25px', borderRadius: '8px' }}>
            {data && data.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))} 
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => renderRow(item, index))}
                    </tbody>
                </table>
            ) : (
                <p style={{color: 'white'}} >No hay datos para cargar</p>
            )}
        </div>
    );
};

export default Table;
