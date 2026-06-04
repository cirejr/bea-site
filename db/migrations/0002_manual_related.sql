CREATE TABLE IF NOT EXISTS formations_related (
  formation_id INTEGER NOT NULL REFERENCES formations(id) ON DELETE CASCADE,
  related_formation_id INTEGER NOT NULL REFERENCES formations(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (formation_id, related_formation_id)
);
