import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import throttle from 'lodash/throttle';
import parse from 'autosuggest-highlight/parse';
import {
  FC,
  memo, useCallback,
  useEffect,
  useMemo,
} from 'react';
import getConfig from 'next/config';
import {
  GoogleSelectTypes,
  PlaceType,
} from './GoogleSelect.typedefs';
import { TextFieldVariant } from '../../Inputs/input.typdefs';

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');

  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

interface Props {
  type: GoogleSelectTypes[];
  onChange: (value: PlaceType | null) => void;
  value: PlaceType | null;
  variant?: TextFieldVariant;
  label: string;
  placeholder: string;
  required?: boolean;
  placePrefix?: string;
}

export const GoogleSelect: FC<Props> = memo((props) => {
  const {
    type,
    onChange,
    value,
    variant = TextFieldVariant.Standard,
    required = false,
    label,
    placeholder,
    placePrefix = '',
  } = props;

  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const loaded = React.useRef(false);

  const { publicRuntimeConfig } = getConfig();

  const googlePlaceApiKey = publicRuntimeConfig.GOOGLE_PLACE_API_KEY;

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${googlePlaceApiKey}&libraries=places&language=en`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = useMemo(
    () => throttle(
      (
        request: { input: string, types: GoogleSelectTypes[] },
        callback: (results?: readonly PlaceType[]) => void,
      ) => {
        (autocompleteService.current as any).getPlacePredictions(
          request,
          callback,
        );
      },
      200,
    ),
    [],
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }

    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);

      return undefined;
    }

    fetch({ input: inputValue, types: type }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch, type]);

  const handleChange = useCallback((event: any, newValue: any) => {
    if (!newValue) {
      onChange(null);
      setOptions([]);

      return;
    }

    setOptions(newValue ? [newValue, ...options] : options);
    onChange({
      description: newValue.description,
      types: newValue.types,
      name: newValue.structured_formatting.main_text,
      placeId: newValue.place_id,
    });
  }, [onChange, options]);

  return (
    <Autocomplete
      id="google-map-demo"
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      fullWidth
      value={value}
      isOptionEqualToValue={(
        option: any,
        newValue: any,
      ) => option.description === newValue.description}
      onChange={handleChange}
      onInputChange={(event, newInputValue) => {
        setInputValue(`${placePrefix ? `${placePrefix} ` : ''}${newInputValue}`);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          fullWidth
          variant={variant}
          required={required}
        />
      )}
      renderOption={(prop, option: any) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length]),
        );

        return (
          <li {...prop}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: 'text.secondary', mr: 2 }}
                />
              </Grid>

              <Grid item xs>
                {parts.map((part: any) => (
                  <span
                    key={part.text}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}

                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
});
