import React from "react";
import './style.css';
import { IconName, library, IconPrefix, IconProp, IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TransactionDescriptionComponentProps {
    description: string
}

export const TransactionDescriptionComponent: React.FC<TransactionDescriptionComponentProps> = ({ description }) => {
    
    library.add(fab, fas);

    const getIconName = (description: string): IconProp => {
        const iconName = description.toLowerCase();
        const iconDefinition: IconDefinition | null = findIconDefinition({ prefix: 'fab', iconName: iconName as IconName });
        if (iconDefinition) {
            return ['fab', iconName] as [IconPrefix, IconName];
        } else {
            return 'dollar-sign';
        }
    }
    
    const iconName = getIconName(description);

    return (
        <div className="description-container">
            <FontAwesomeIcon icon={iconName} size="lg" />
            <p>{description}</p>
        </div>
    );
};

// Check if ['fab', iconName as any] is in library
