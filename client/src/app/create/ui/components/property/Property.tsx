'use client';
import { useContext, useEffect, useState } from 'react';
import styles from './Property.module.scss';
import PropertyPanel, { IPropertyPanelSectionProps } from './PropertyPanel';
import { EditorContext } from 'context/EditorProvider';

export interface IPropertiesProps {
  panels: Array<IPropertyPanelSectionProps>;
}

let ctr = 0;

export default function () {
  const editorContext = useContext(EditorContext);
  const [panels, setPanels] = useState<Array<IPropertyPanelSectionProps>>([]);
  useEffect(() => {
    ctr++;
    setPanels(editorContext.state.propertiesPanel);
  });

  if (panels.length === 0) {
    // hidden state? lol
    return <></>;
  }

  return (
    <div className={styles['properties-container']}>
      {panels.map((p, i) => (
        <PropertyPanel {...p} key={p.name + ctr} />
      ))}
    </div>
  );
}