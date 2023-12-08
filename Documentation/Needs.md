# Basic UX Logic

```mermaid
graph TD;

Login(Login Page) --> Registered{Registered?}
Registered -->|No| Reg_Page(Register Page)
Registered --> |Yes| Account(Account Page)
Reg_Page --> Login
Account --> Function(Function Pages)
Function --> Account
Account -->|Log out| Login
```

## Account

```mermaid
classDiagram
    class Account_Page{
        Display account_info
        Display locations
        Display devices

        Jump My_Locations_Page()
        Jump My_Devices_Page()
        Jump Energy_Info_Page()
        Jump Account_Settings_Page()
    }

    class Account_Settings_Page{
        Display name
        Display email
        Display billing_info

        ChangeBillingAddress()
        ChangeEmail()
        ChangePassword()
    }

    Account_Settings_Page --> Account_Page: .../account/customer_id/settings/

    note for Account_Page "Main Page"

```

## Devices

```mermaid
classDiagram
    class My_Devices_Page{
        Input Tick_Box: filter device location, type, id, model
        Display Device_Card[] device_list

        AddDevice()
        Jump Account_Page()
    }

    class Device_Card{
        Display device_model
        Display device_tag
        Display this_month_energy
        Display device_location

        Jump ModifyDevice()
        Jump Device_Detail_Page(device_id)
    }
    note for Device_Card "ModifyDevice is done on the same page / to another page?"
    note for Device_Card "ModifyDevice(){\n change: tag, location\n delete\n}"

    Device_Card -->My_Devices_Page: Component of

    note for My_Devices_Page "Main Page"
```

## Locations

```mermaid
classDiagram
    class My_Locations_Page{
        Display Location_Card[] location_list

        AddLocation()
        Jump Account_Page()
    }

    class Location_Card{
        Display location_brief_address
        Display location_full_address
        Display this_month_energy

        Jump ModifyLocation()
        Jump Energy_Location_Page(location_id)
    }
    note for Location_Card "ModifyLocation is done on the same page / to another page?"
    note for Location_Card "ModifyLocation(){\n change tag, squre_feet, num_bed, occupants\n delete \n}"
    Location_Card --> My_Locations_Page: Component of

    note for My_Locations_Page "Main Page"
```

## EnergyInfo

```mermaid
classDiagram
    class Energy_Info_Page{
        Display Overview_Text: detailed number, proportion, ...
        Display Graph_Overview: Bar Chart over Month/Day/Week on Price/kwh
        Display Graph_Location: Pie Chart on location_id
        Display Graph_Device: Pie Chart on device_type

        Jump EnergyLocation(location_id)
        Jump EnergyDevice(location_id, device_type)
    }

    class Energy_Location_Page{
        // Specified location_id
        Input Tick_Box: select location_id
        Display Overview_Text
        Display Graph_Overview: Bar Chart over Month/Day/Week on Price/kwh/percentage over avg
        Display Graph_Device: Pie Chart on device_type
    }
    Energy_Info_Page --> Energy_Location_Page: Jump
    Energy_Location_Page --> Energy_Info_Page: Back

    class Energy_Device_Page{
        // Specified location_id, device_type, device_model
        Input Tick_Box: select location_ids
        Input Tick_Box: select device_types
        Input Tick_Box: select device_ids

        Display Device_Energy_Card[] device_list

    }
    Energy_Info_Page --> Energy_Device_Page: Jump
    Energy_Device_Page --> Energy_Info_Page: Back
    Energy_Location_Page --> Energy_Device_Page: Jump
    Energy_Device_Page --> Energy_Location_Page: Back

    class Device_Energy_Card{
        Display device_id
        Display device_type, model
        Display energy_kwh / proportion

        Jump DeviceDetail(device_id)
    }
    Device_Energy_Card --> Energy_Device_Page: Component of

    class Device_Detail_Page{
        Display device_id
        Display device_type, model
        Display device_location_info
        Graph energy_info: bar chart over month/week, or line chat over day
    }
    note for Device_Detail_Page "When scale = month/week -> bar chart\ When scale = day -> line chart, with info of events"
    Device_Energy_Card --> Device_Detail_Page: Jump to
    Device_Detail_Page --> Energy_Device_Page: Back

    note for Energy_Info_Page "Main Page"
```

### Conclusion On Graphs

1. Bar Chart
   1. Energy_Info_Page
      - X-Axis: Month, Week, Day | Y-Axis: kwh, price
   2. Energy_Location_Page
      - X-Axis: Month, Week, Day | Y-Axis: kwh, price, percentage vs. avg
   3. Device_Detail_Page
      - X-Axis: Month, Week, Day | Y-Axis: kwh, price
2. Pie Chart
   1. Energy_Info_Page
      - different location_ids
   2. Energy_Location_Page
      - different device_types
3. Line Chart
   1. Device_Detail_Page
      - X-Axis: Hour of day | Y-Axis: kwh, price
      - Event displayed on line
