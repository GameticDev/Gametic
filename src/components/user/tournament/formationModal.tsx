import React from "react";
import { FaTimes } from "react-icons/fa";

interface Player {
  name: string;
  position: string;
}

interface Team {
  name: string;
  sport: string;
  players: Player[];
  teamManager: {
    username: string;
    email: string;
  };
  members: string[]
}

interface Position {
  x: number;
  y: number;
  role: string;
  name: string;
}

interface Formation {
  name: string;
  positions: Position[];
}

interface FieldConfig {
  width: number;
  height: number;
  color: string;
  shape?: string;
}

interface SportData {
  name: string;
  field: FieldConfig;
  formations: Record<number, Formation>;
}

interface FormationModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: Team | null;
  sport: string;
  maxPlayers: number;
}

const FormationModal: React.FC<FormationModalProps> = ({ 
  isOpen, 
  onClose, 
  team, 
  sport, 
  maxPlayers 
}) => {
  console.log(team?.members)
  if (!isOpen || !team) return null;

  // Sports formation data
  const sportsData: Record<string, SportData> = {
    football: {
      name: 'Football',
      field: { width: 320, height: 480, color: 'bg-green-500' },
      formations: {
        5: {
          name: '5-a-side',
          positions: [
            { x: 160, y: 440, role: 'GK', name: 'Goalkeeper' },
            { x: 96, y: 320, role: 'DEF', name: 'Left Back' },
            { x: 224, y: 320, role: 'DEF', name: 'Right Back' },
            { x: 120, y: 200, role: 'MID', name: 'Left Mid' },
            { x: 200, y: 200, role: 'MID', name: 'Right Mid' }
          ]
        },
        7: {
          name: '7-a-side',
          positions: [
            { x: 160, y: 440, role: 'GK', name: 'Goalkeeper' },
            { x: 80, y: 360, role: 'DEF', name: 'Left Back' },
            { x: 160, y: 376, role: 'DEF', name: 'Centre Back' },
            { x: 240, y: 360, role: 'DEF', name: 'Right Back' },
            { x: 104, y: 240, role: 'MID', name: 'Left Mid' },
            { x: 216, y: 240, role: 'MID', name: 'Right Mid' },
            { x: 160, y: 120, role: 'FWD', name: 'Striker' }
          ]
        },
        11: {
          name: '11-a-side',
          positions: [
            { x: 160, y: 456, role: 'GK', name: 'Goalkeeper' },
            { x: 64, y: 384, role: 'DEF', name: 'Left Back' },
            { x: 128, y: 400, role: 'DEF', name: 'Centre Back' },
            { x: 192, y: 400, role: 'DEF', name: 'Centre Back' },
            { x: 256, y: 384, role: 'DEF', name: 'Right Back' },
            { x: 96, y: 280, role: 'MID', name: 'Left Mid' },
            { x: 160, y: 304, role: 'MID', name: 'Centre Mid' },
            { x: 224, y: 280, role: 'MID', name: 'Right Mid' },
            { x: 80, y: 160, role: 'FWD', name: 'Left Wing' },
            { x: 160, y: 120, role: 'FWD', name: 'Striker' },
            { x: 240, y: 160, role: 'FWD', name: 'Right Wing' }
          ]
        }
      }
    },
    cricket: {
      name: 'Cricket',
      field: { width: 320, height: 320, color: 'bg-amber-200', shape: 'circle' },
      formations: {
        6: {
          name: '6-a-side',
          positions: [
            { x: 160, y: 280, role: 'WK', name: 'Wicket Keeper' },
            { x: 160, y: 256, role: 'BOW', name: 'Bowler' },
            { x: 120, y: 224, role: 'SLI', name: 'Slip' },
            { x: 96, y: 160, role: 'COV', name: 'Cover' },
            { x: 224, y: 160, role: 'MID', name: 'Mid Off' },
            { x: 160, y: 96, role: 'LON', name: 'Long On' }
          ]
        },
        8: {
          name: '8-a-side',
          positions: [
            { x: 160, y: 280, role: 'WK', name: 'Wicket Keeper' },
            { x: 160, y: 256, role: 'BOW', name: 'Bowler' },
            { x: 120, y: 224, role: 'SLI', name: 'Slip' },
            { x: 200, y: 224, role: 'GUL', name: 'Gully' },
            { x: 96, y: 160, role: 'COV', name: 'Cover' },
            { x: 224, y: 160, role: 'MID', name: 'Mid Off' },
            { x: 128, y: 96, role: 'LON', name: 'Long On' },
            { x: 192, y: 96, role: 'LOF', name: 'Long Off' }
          ]
        },
        11: {
          name: '11-a-side',
          positions: [
            { x: 160, y: 296, role: 'WK', name: 'Wicket Keeper' },
            { x: 160, y: 272, role: 'BOW', name: 'Bowler' },
            { x: 120, y: 240, role: 'SLI', name: 'Slip' },
            { x: 144, y: 232, role: 'SL2', name: '2nd Slip' },
            { x: 200, y: 224, role: 'GUL', name: 'Gully' },
            { x: 80, y: 176, role: 'COV', name: 'Cover' },
            { x: 240, y: 176, role: 'MID', name: 'Mid Off' },
            { x: 64, y: 120, role: 'SQU', name: 'Square Leg' },
            { x: 256, y: 120, role: 'POI', name: 'Point' },
            { x: 128, y: 64, role: 'LON', name: 'Long On' },
            { x: 192, y: 64, role: 'LOF', name: 'Long Off' }
          ]
        }
      }
    },
    basketball: {
      name: 'Basketball',
      field: { width: 320, height: 480, color: 'bg-orange-300' },
      formations: {
        3: {
          name: '3-on-3',
          positions: [
            { x: 160, y: 400, role: 'C', name: 'Center' },
            { x: 96, y: 320, role: 'G', name: 'Guard' },
            { x: 224, y: 320, role: 'F', name: 'Forward' }
          ]
        },
        5: {
          name: '5-on-5',
          positions: [
            { x: 160, y: 416, role: 'C', name: 'Center' },
            { x: 96, y: 384, role: 'PF', name: 'Power Forward' },
            { x: 224, y: 384, role: 'SF', name: 'Small Forward' },
            { x: 80, y: 304, role: 'PG', name: 'Point Guard' },
            { x: 240, y: 304, role: 'SG', name: 'Shooting Guard' }
          ]
        }
      }
    },
    volleyball: {
      name: 'Volleyball',
      field: { width: 320, height: 240, color: 'bg-yellow-200' },
      formations: {
        4: {
          name: '4-on-4',
          positions: [
            { x: 96, y: 160, role: 'S', name: 'Setter' },
            { x: 224, y: 160, role: 'OH', name: 'Outside Hitter' },
            { x: 96, y: 80, role: 'MB', name: 'Middle Blocker' },
            { x: 224, y: 80, role: 'L', name: 'Libero' }
          ]
        },
        6: {
          name: '6-on-6',
          positions: [
            { x: 80, y: 176, role: 'S', name: 'Setter' },
            { x: 160, y: 176, role: 'MB', name: 'Middle Blocker' },
            { x: 240, y: 176, role: 'OH', name: 'Outside Hitter' },
            { x: 80, y: 64, role: 'L', name: 'Libero' },
            { x: 160, y: 64, role: 'OP', name: 'Opposite' },
            { x: 240, y: 64, role: 'OH2', name: 'Outside Hitter' }
          ]
        }
      }
    },
    badminton: {
      name: 'Badminton',
      field: { width: 240, height: 400, color: 'bg-blue-100' },
      formations: {
        1: {
          name: 'Singles',
          positions: [
            { x: 120, y: 320, role: 'P1', name: 'Player' }
          ]
        },
        2: {
          name: 'Doubles',
          positions: [
            { x: 80, y: 320, role: 'P1', name: 'Player 1' },
            { x: 160, y: 320, role: 'P2', name: 'Player 2' }
          ]
        }
      }
    },
    tennis: {
      name: 'Tennis',
      field: { width: 240, height: 400, color: 'bg-green-200' },
      formations: {
        1: {
          name: 'Singles',
          positions: [
            { x: 120, y: 320, role: 'P1', name: 'Player' }
          ]
        },
        2: {
          name: 'Doubles',
          positions: [
            { x: 80, y: 320, role: 'P1', name: 'Player 1' },
            { x: 160, y: 320, role: 'P2', name: 'Player 2' }
          ]
        }
      }
    },
    hockey: {
      name: 'Hockey',
      field: { width: 320, height: 480, color: 'bg-teal-400' },
      formations: {
        6: {
          name: '6-a-side',
          positions: [
            { x: 160, y: 440, role: 'GK', name: 'Goalkeeper' },
            { x: 96, y: 360, role: 'DEF', name: 'Left Defense' },
            { x: 224, y: 360, role: 'DEF', name: 'Right Defense' },
            { x: 120, y: 240, role: 'MID', name: 'Left Mid' },
            { x: 200, y: 240, role: 'MID', name: 'Right Mid' },
            { x: 160, y: 120, role: 'FWD', name: 'Forward' }
          ]
        },
        11: {
          name: '11-a-side',
          positions: [
            { x: 160, y: 456, role: 'GK', name: 'Goalkeeper' },
            { x: 64, y: 384, role: 'LB', name: 'Left Back' },
            { x: 128, y: 400, role: 'CB', name: 'Centre Back' },
            { x: 192, y: 400, role: 'CB', name: 'Centre Back' },
            { x: 256, y: 384, role: 'RB', name: 'Right Back' },
            { x: 96, y: 280, role: 'LM', name: 'Left Mid' },
            { x: 160, y: 304, role: 'CM', name: 'Centre Mid' },
            { x: 224, y: 280, role: 'RM', name: 'Right Mid' },
            { x: 80, y: 160, role: 'LW', name: 'Left Wing' },
            { x: 160, y: 120, role: 'CF', name: 'Centre Forward' },
            { x: 240, y: 160, role: 'RW', name: 'Right Wing' }
          ]
        }
      }
    },
    swimming: {
      name: 'Swimming',
      field: { width: 320, height: 160, color: 'bg-cyan-300' },
      formations: {
        1: {
          name: 'Individual',
          positions: [
            { x: 160, y: 80, role: 'SW', name: 'Swimmer' }
          ]
        },
        4: {
          name: 'Relay',
          positions: [
            { x: 80, y: 80, role: 'SW1', name: 'Swimmer 1' },
            { x: 133, y: 80, role: 'SW2', name: 'Swimmer 2' },
            { x: 187, y: 80, role: 'SW3', name: 'Swimmer 3' },
            { x: 240, y: 80, role: 'SW4', name: 'Swimmer 4' }
          ]
        }
      }
    }
  };

  const getRoleColor = (role: string): string => {
    const colors: Record<string, string> = {
      GK: '#00423D', WK: '#00423D',
      DEF: '#415C41', BOW: '#415C41',
      MID: '#98916D', SLI: '#98916D',
      FWD: '#6B7280', COV: '#6B7280',
      C: '#059669', G: '#059669',
      PG: '#7C3AED', SG: '#7C3AED',
      PF: '#DC2626', SF: '#DC2626',
      S: '#F59E0B', OH: '#F59E0B',
      MB: '#EF4444', L: '#10B981',
      OP: '#8B5CF6', P1: '#3B82F6',
      P2: '#EF4444', SW: '#06B6D4',
      LB: '#415C41', CB: '#415C41',
      RB: '#415C41', LM: '#98916D',
      CM: '#98916D', RM: '#98916D',
      LW: '#6B7280', CF: '#6B7280',
      RW: '#6B7280', F: '#059669',
      GUL: '#98916D', LON: '#6B7280',
      LOF: '#6B7280', SL2: '#98916D',
      SQU: '#6B7280', POI: '#6B7280',
      OH2: '#F59E0B', SW1: '#06B6D4',
      SW2: '#06B6D4', SW3: '#06B6D4',
      SW4: '#06B6D4'
    };
    return colors[role] || '#6B7280';
  };

  const getPlayerName = (index: number): string => {
    // First check if we have members array and the index is valid
    if (team.members && team.members[index]) {
      return team.members[index];
    }
    // Fallback to players array if members is not available
    if (team.players && team.players[index]) {
      return team.players[index].name;
    }
    // Final fallback to generic player name
    return `Player ${index + 1}`;
  };

  const getPlayerInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2);
  };

  const sportKey = sport.toLowerCase();
  const currentSport = sportsData[sportKey];
  const currentFormation = currentSport?.formations[maxPlayers];

  if (!currentSport || !currentFormation) {
    return (
      <dialog className="modal z-50" open={isOpen}>
        <div className="modal-box bg-white max-w-md w-full mx-4 shadow-xl rounded-lg">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-gray-100"
            onClick={onClose}
            type="button"
          >
            <FaTimes />
          </button>
          
          <div className="pt-4">
            <h3 className="text-lg font-bold mb-4" style={{ color: "#00423D" }}>
              {team.name} Formation
            </h3>
            <p className="text-center text-gray-600">
              Formation not available for this sport format
            </p>
          </div>
        </div>
      </dialog>
    );
  }

  return (
    <dialog className="modal z-50" open={isOpen}>
      <div className="modal-box bg-white max-w-5xl w-full max-h-[85vh] p-0 shadow-xl rounded-lg">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 hover:bg-gray-100 z-10"
          onClick={onClose}
          type="button"
        >
          <FaTimes />
        </button>

        <div className="p-4 h-full overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold" style={{ color: "#00423D" }}>
                {team.name}
              </h3>
              <p className="text-sm" style={{ color: "#415C41" }}>
                {currentFormation.name} Formation • Manager: {team.teamManager?.username}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Formation Display */}
            <div className="flex flex-col items-center">
              <div className="relative mx-auto mb-3" style={{ maxWidth: '400px' }}>
                {/* Field/Court Background */}
                <div 
                  className={`relative ${currentSport.field.color} border-4 border-white mx-auto shadow-2xl ${
                    currentSport.field.shape === 'circle' ? 'rounded-full' : 'rounded-lg'
                  }`}
                  style={{ 
                    width: currentSport.field.width, 
                    height: currentSport.field.height 
                  }}
                >
                  {/* Field Lines based on sport */}
                  {sportKey === 'football' && (
                    <>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-white opacity-50"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white rounded-full opacity-50"></div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-10 border-2 border-white border-b-0 opacity-50"></div>
                    </>
                  )}
                  
                  {sportKey === 'basketball' && (
                    <>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-white opacity-50"></div>
                      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-white rounded-full opacity-50"></div>
                    </>
                  )}

                  {sportKey === 'volleyball' && (
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white"></div>
                  )}

                  {(sportKey === 'tennis' || sportKey === 'badminton') && (
                    <>
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white"></div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-white opacity-50"></div>
                    </>
                  )}

                  {sportKey === 'swimming' && (
                    <div className="absolute inset-2 border-2 border-blue-700 rounded opacity-50">
                      <div className="w-full h-0.5 bg-blue-700 absolute top-1/2 transform -translate-y-1/2"></div>
                    </div>
                  )}

                  {/* Players */}
                  {currentFormation.positions.map((position: Position, index: number) => {
                    const playerName = getPlayerName(index);
                    const playerInitials = getPlayerInitials(playerName);
                    
                    return (
                      <div
                        key={index}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                        style={{ left: position.x, top: position.y }}
                      >
                        <div 
                          className="w-10 h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold transition-all duration-200 hover:scale-110 group-hover:shadow-xl relative"
                          style={{ backgroundColor: getRoleColor(position.role) }}
                        >
                          {playerInitials}
                        </div>
                        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-90 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">
                          <div className="font-semibold">{playerName}</div>
                          <div className="text-gray-300">{position.name}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Team Information */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-base" style={{ color: "#00423D" }}>
                  Team Details
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm" style={{ color: "#415C41" }}>Team Name:</span>
                    <span className="font-semibold text-sm" style={{ color: "#00423D" }}>{team.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm" style={{ color: "#415C41" }}>Sport:</span>
                    <span className="font-semibold text-sm" style={{ color: "#00423D" }}>{sport}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm" style={{ color: "#415C41" }}>Formation:</span>
                    <span className="font-semibold text-sm" style={{ color: "#00423D" }}>{currentFormation.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm" style={{ color: "#415C41" }}>Players:</span>
                    <span className="font-semibold text-sm" style={{ color: "#00423D" }}>{currentFormation.positions.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm" style={{ color: "#415C41" }}>Manager:</span>
                    <span className="font-semibold text-sm" style={{ color: "#00423D" }}>{team.teamManager?.username}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-base" style={{ color: "#00423D" }}>
                  Player Lineup
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {currentFormation.positions.map((position: Position, index: number) => {
                    const playerName = getPlayerName(index);
                    return (
                      <div key={index} className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md"
                          style={{ backgroundColor: getRoleColor(position.role) }}
                        >
                          {getPlayerInitials(playerName)}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm" style={{ color: "#00423D" }}>
                            {playerName}
                          </div>
                          <div className="text-xs" style={{ color: "#415C41" }}>
                            {position.name}
                          </div>
                        </div>
                        <span 
                          className="text-xs px-2 py-1 rounded-full text-white font-medium"
                          style={{ backgroundColor: getRoleColor(position.role) }}
                        >
                          {position.role}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="text-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                <p className="text-xs font-medium" style={{ color: "#415C41" }}>
                  💡 Hover over players on the field to see their details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default FormationModal;