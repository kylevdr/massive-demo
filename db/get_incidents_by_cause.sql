SELECT incidents.id,
       incidents.us_state,
       injuries.name,
       affected_areas.name,
       causes.name
FROM incidents
JOIN injuries ON injuries.id = incidents.injury_id
JOIN affected_areas ON injuries.affected_area_id = affected_areas.id
JOIN causes ON incidents.cause_id = causes.id
WHERE causes.name = $1;
