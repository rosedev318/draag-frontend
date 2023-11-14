import React, { useEffect, useState } from 'react';
import { useTimezoneSelect, allTimezones } from 'react-timezone-select';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import { MenuItem, MenuDivider } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { KeyboardArrowDown } from '@mui/icons-material';
import './TzSelect.css';

const TzSelect = (props) => {
  const { timezone, handleChange } = props;

  const labelStyle = 'original';
  const timezones = {
    ...allTimezones
  };
  const { options, parseTimezone } = useTimezoneSelect({
    labelStyle,
    timezones
  });
  options.sort((x, y) => x.value.localeCompare(y.value));
  const groupedOptions = [];
  let temp = options[0].value.split('/')[0];
  groupedOptions.push({
    value: temp,
    label: temp,
    type: 'group-label'
  });
  options.forEach((option) => {
    if (temp != option.value.split('/')[0]) {
      temp = option.value.split('/')[0];
      groupedOptions.push({
        value: temp,
        label: temp,
        type: 'group-label'
      });
    }
    groupedOptions.push(option);
  });

  const filterTimezone = (query, timezone, _index, exactMatch) => {
    const normalizedTitle = timezone.value.toLowerCase();
    const normalizedQuery = query.toLowerCase();

    if (exactMatch) {
      return normalizedTitle === normalizedQuery;
    } else {
      return normalizedTitle.indexOf(normalizedQuery) >= 0;
    }
  };
  const renderTimezone = (
    tz,
    { handleClick, handleFocus, modifiers, query }
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    if (tz?.type == 'group-label') {
      return <MenuDivider key={tz.value} title={tz.value} />;
    }
    const time = new Date().toLocaleString('en-US', {
      timeZone: tz.value,
      hour12: true,
      hour: 'numeric',
      minute: 'numeric'
    });
    return (
      <MenuItem
        active={tz.value == timezone.value}
        disabled={modifiers.disabled}
        key={tz.value}
        label={time}
        onClick={handleClick}
        onFocus={handleFocus}
        roleStructure="listoption"
        text={tz.value.toString()}
        // text={tz.label.toString().substring(tz.label.toString().indexOf(")") + 1).trim()}
      />
    );
  };

  return (
    <div className="mx-auto w-70">
      <Select
        items={groupedOptions}
        itemPredicate={filterTimezone}
        itemRenderer={renderTimezone}
        noResults={
          <MenuItem
            disabled={true}
            text="No results."
            roleStructure="listoption"
          />
        }
        onItemSelect={handleChange}
        popoverProps={{ matchTargetWidth: true }}
        inputProps={{ placeholder: "Searching..." }}
      >
        <div className="dropdown-container w-full ml-0">
          {timezone?.value.replace('/', ' - ')}
          <KeyboardArrowDown className="down-icon" />
        </div>
      </Select>
    </div>
  );
};

export default TzSelect;
