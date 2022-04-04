import React from 'react';



class CheckboxGroup extends React.Component {
	constructor(props){
		super(props);

	}
  
	render() {
		const {children, legend} = this.props;
		const createCheckbox = React.Children.map(children, (child) => {
			return (
              <li>
                   {React.cloneElement(child,
                     {
                       id: child.props.id,
                       label: child.props.label,
                       disabled: child.props.disabled,
                       checked: child.props.checked,
                       name: child.props.name,
                       handleCheckboxChange: child.props.handleCheckboxChange
                      }
                  )}
              </li>
			);
		});
    
		return (
      <div className="checkbox">
				<fieldset className="usa-fieldset-inputs usa-sans">
					<legend className="usa-sr-only">{legend}</legend>
					<ul className="usa-unstyled-list">
						{createCheckbox}
					</ul>

				</fieldset>
		
      </div>
		);
	}

}

export default CheckboxGroup;