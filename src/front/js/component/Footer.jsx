import React from "react";


export const Footer = () => (
	<footer className="bd-footer py-4 py-md-5 mt-5 bg-body-tertiary">
		<div className="mb-3 text-center">
    		<ul className="list-unstyled small">
    		  <li className="mb-2">Diseñado y desarrollado con todo el <i className="fa-regular fa-heart"></i> por el team de Mike Aprile, Pau Fargas y Merlina Dowgaluk.</li>
    		  <li className="mb-2">Por cualquier consulta, puedes contactarnos <a href="mailto:example@gmail.com?Subject=Consulta" target="_blank" rel="license noopener">aquí.</a></li>
    		</ul>
    	</div>
		<div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
    		© 2024 Copyright
    	</div>
    </footer>
);
